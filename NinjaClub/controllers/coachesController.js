const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const allCoaches = await db.coaches.findAll();
    res.send(allCoaches);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const coach = await getCoach(req, res);
    if (!coach) return;
    res.send(coach);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (
      !req.body.GroupID ||
      !req.body.FirstName ||
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.Phonenumber ||
      !req.body.Email
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const newCoach = {
      GroupID: req.body.GroupID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Address: req.body.Address,
      Phonenumber: req.body.Phonenumber,
      Email: req.body.Email,
    };

    const createdCoach = await db.coaches.create(newCoach);

    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/coaches/${createdCoach.CoachID}`)
      .send(createdCoach);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
  try {
    const coach = await getCoach(req, res);
    if (!coach) return;

    if (
      !req.body.GroupID ||
      !req.body.FirstName ||
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.Phonenumber ||
      !req.body.Email
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    coach.GroupID = req.body.GroupID;
    coach.FirstName = req.body.FirstName;
    coach.LastName = req.body.LastName;
    coach.Address = req.body.Address;
    coach.Phonenumber = req.body.Phonenumber;
    coach.Email = req.body.Email;

    await coach.save();

    res
      .status(200)
      .location(`${Utils.getBaseURL(req)}/coaches/${coach.CoachID}`)
      .send(coach);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const coach = await getCoach(req, res);
    if (!coach) return;

    await coach.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCoach = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid coach ID ${req.params.id}` });
    return null;
  }

  const coach = await db.coaches.findByPk(idNumber);
  if (!coach) {
    res.status(404).send({ error: "Coach not found" });
    return null;
  }
  return coach;
};
