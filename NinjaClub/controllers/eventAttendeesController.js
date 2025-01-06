const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const allAttendees = await db.eventAttendees.findAll();
    res.send(allAttendees);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


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

    const createdAttendee = await db.eventAttendees.create(newAttendee);

    // For composite primary keys, the location might not be as simple:
    res
      .status(201)
      .location(
        `${Utils.getBaseURL(req)}/eventAttendees/${createdAttendee.EventID}/${createdAttendee.MemberID}`
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
        `${Utils.getBaseURL(req)}/eventAttendees/${attendee.EventID}/${attendee.MemberID}`
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


const getAttendee = async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const memberId = parseInt(req.params.memberId);

  if (isNaN(eventId) || isNaN(memberId)) {
    res.status(400).send({
      error: `Invalid IDs: eventId=${req.params.eventId}, memberId=${req.params.memberId}`,
    });
    return null;
  }


  const attendee = await db.eventAttendees.findOne({
    where: {
      EventID: eventId,
      MemberID: memberId,
    },
  });

  if (!attendee) {
    res.status(404).send({ error: "Event attendee not found" });
    return null;
  }
  return attendee;
};
