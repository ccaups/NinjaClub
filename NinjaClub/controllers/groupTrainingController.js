const {db} = require("../db");
const Utils = require("./utlis");

exports.getAll = async (req, res) => {
  try {
    const allGroups = await db.groupTraining.findAll();
    res.send(allGroups);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const group = await getGroup(req, res);
    if (!group) return;
    res.send(group);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (
      !req.body.GroupName ||
      !req.body.Schedule ||
      !req.body.MemberID ||
      !req.body.CoachID
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const newGroup = {
      GroupName: req.body.GroupName,
      Schedule: req.body.Schedule,
      MemberID: req.body.MemberID,
      CoachID: req.body.CoachID,
    };

    const createdGroup = await db.groupTraining.create(newGroup);

    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/groupTraining/${createdGroup.GroupID}`)
      .send(createdGroup);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
  try {
    const group = await getGroup(req, res);
    if (!group) return;

    if (
      !req.body.GroupName ||
      !req.body.Schedule ||
      !req.body.MemberID ||
      !req.body.CoachID
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    group.GroupName = req.body.GroupName;
    group.Schedule = req.body.Schedule;
    group.MemberID = req.body.MemberID;
    group.CoachID = req.body.CoachID;

    await group.save();

    res
      .status(200)
      .location(`${Utils.getBaseURL(req)}/groupTraining/${group.GroupID}`)
      .send(group);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const group = await getGroup(req, res);
    if (!group) return;

    await group.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getGroup = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid group ID ${req.params.id}` });
    return null;
  }

  const group = await db.groupTraining.findByPk(idNumber);
  if (!group) {
    res.status(404).send({ error: "Group training not found" });
    return null;
  }
  return group;
};
