const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const allEvents = await db.events.findAll();
    res.send(allEvents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const event = await getEvent(req, res);
    if (!event) return;
    res.send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (
      !req.body.CoachID ||
      !req.body.Name ||
      !req.body.Date ||
      !req.body.Location ||
      !req.body.Description
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const newEvent = {
      CoachID: req.body.CoachID,
      Name: req.body.Name,
      Date: req.body.Date,
      Location: req.body.Location,
      Description: req.body.Description,
    };

    const createdEvent = await db.events.create(newEvent);

    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/events/${createdEvent.EventID}`)
      .send(createdEvent);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
  try {
    const event = await getEvent(req, res);
    if (!event) return;

    if (
      !req.body.CoachID ||
      !req.body.Name ||
      !req.body.Date ||
      !req.body.Location ||
      !req.body.Description
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    event.CoachID = req.body.CoachID;
    event.Name = req.body.Name;
    event.Date = req.body.Date;
    event.Location = req.body.Location;
    event.Description = req.body.Description;

    await event.save();

    res
      .status(200)
      .location(`${Utils.getBaseURL(req)}/events/${event.EventID}`)
      .send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const event = await getEvent(req, res);
    if (!event) return;

    await event.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getEvent = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid event ID ${req.params.id}` });
    return null;
  }

  const event = await db.events.findByPk(idNumber);
  if (!event) {
    res.status(404).send({ error: "Event not found" });
    return null;
  }
  return event;
};
