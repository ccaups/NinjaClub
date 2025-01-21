const { db } = require("../db");
const Utils = require("./utlis");

exports.getAll = async (req, res) => {
  try {
    const allEvents = await db.Events.findAll();
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

    const createdEvent = await db.Events.create(newEvent);

    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/events/${createdEvent.EventID}`)
      .send(createdEvent);
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
