const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const allMembers = await db.members.findAll();

    res.send(allMembers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const member = await getMember(req, res);
    if (!member) return;
    res.send(member);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Validate required fields
    if (
      !req.body.FirstName ||
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.Phonenumber ||
      !req.body.Email ||
      !req.body.RegistrationDate ||
      typeof req.body.Active === "undefined" ||
      typeof req.body.Level === "undefined"
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Create a new member object
    const newMember = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Address: req.body.Address,
      Phonenumber: req.body.Phonenumber,
      Email: req.body.Email,
      RegistrationDate: req.body.RegistrationDate,
      Active: req.body.Active,
      Level: req.body.Level,
    };

    // Insert into DB
    const createdMember = await db.members.create(newMember);

    // Return the ID or entire object
    res
      .status(201)
      .location(`${Utils.getBaseURL(req)}/members/${createdMember.MemberID}`)
      .send(createdMember);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.editById = async (req, res) => {
  try {
    const member = await getMember(req, res);
    if (!member) return;

    // Validate
    if (
      !req.body.FirstName ||
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.Phonenumber ||
      !req.body.Email ||
      !req.body.RegistrationDate ||
      typeof req.body.Active === "undefined" ||
      typeof req.body.Level === "undefined"
    ) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Update
    member.FirstName = req.body.FirstName;
    member.LastName = req.body.LastName;
    member.Address = req.body.Address;
    member.Phonenumber = req.body.Phonenumber;
    member.Email = req.body.Email;
    member.RegistrationDate = req.body.RegistrationDate;
    member.Active = req.body.Active;
    member.Level = req.body.Level;

    // Save in DB
    await member.save();

    return res
      .status(200)
      .location(`${Utils.getBaseURL(req)}/members/${member.MemberID}`)
      .send(member);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const member = await getMember(req, res);
    if (!member) return;

    await member.destroy();
    return res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getMember = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid member ID ${req.params.id}` });
    return null;
  }

  const member = await db.members.findByPk(idNumber);
  if (!member) {
    res.status(404).send({ error: "Member not found" });
    return null;
  }
  return member;
};
