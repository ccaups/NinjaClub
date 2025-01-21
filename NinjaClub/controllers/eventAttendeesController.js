const { db } = require("../db");
const Utils = require("./utlis");



exports.getById = async (req, res) => {
  try {
    const attendee = await getAttendee(req, res);
    if (!attendee) return;
    res.send(attendee);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.EventID || !req.body.MemberID || !req.body.RSVPStatus) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const newAttendee = {
      EventID: req.body.EventID,
      MemberID: req.body.MemberID,
      RSVPStatus: req.body.RSVPStatus,
    };

    const createdAttendee = await db.EventAttendees.create(newAttendee);

    res
      .status(201)
      .location(
        `${Utils.getBaseURL(req)}/eventAttendees/${createdAttendee.EventAttendeesID}`
      )
      .send(createdAttendee);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
  try {
    const attendee = await getAttendee(req, res);
    if (!attendee) return;

    if (!req.body.RSVPStatus) {
      return res.status(400).send({ error: "Missing required field RSVPStatus" });
    }

    attendee.RSVPStatus = req.body.RSVPStatus;
    await attendee.save();

    res
      .status(200)
      .location(
        `${Utils.getBaseURL(req)}/eventAttendees/${attendee.EventAttendeesID}`
      )
      .send(attendee);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const attendee = await getAttendee(req, res);
    if (!attendee) return;

    await attendee.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

