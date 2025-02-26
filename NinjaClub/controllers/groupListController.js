const {db} = require("../db");
const Utils = require("./utlis");

exports.getAll = async (req, res) => {
  try {
    const allGroups = await db.GroupList.findAll();
    res.send(allGroups);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const group = await getGroup(req, res);
    
    if (!group) {
      return res.status(400).send({ error: "ID group bad Request" }); // 400 for invalid input
    }
    
    res.send(group);
  } catch (error) {
    res.status(404).send({ error: "ID group not found" }); // 404 for not found
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

    const createdGroup = await db.GroupList.create(newGroup);

    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/GroupList/${createdGroup.GroupID}`)
      .send(createdGroup);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
    const group = await getGroup(req, res);
    if (!group) {
      return res.status(404).send({ error: "Id was not found in group array." });
    }

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
      .location(`${Utils.getBaseURL(req)}/GroupList/${group.GroupID}`)
      .send(group);
  }

exports.deleteById = async (req, res) => {
  try {
    const group = await getGroup(req, res);

    if (!group) {
      return res.status(404).send({ error: "Id was not found in group array." });
    }

    await group.destroy();
    return res.status(204).send(); // Deleted successfully
  } catch (error) {
    if (error.message.includes('bad request')) {
      return res.status(400).send({ error: "Member ID was bad request." });
    }
    res.status(500).send({ error: error.message });
  }
};



const getGroup = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid group ID ${req.params.id}` });
    return null;
  }

  const group = await db.GroupList.findByPk(idNumber);
  if (!group) {
    res.status(404).send({ error: "Group training not found" });
    return null;
  }
  return group;
};