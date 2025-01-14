const {db} = require("../db");
const Utlis = require("./utlis");


exports.getAll = async (req, res) => { 
    const members = await db.Members.findAll();

    res
    .send(members
        .map(({MemberID, FirstName,LastName}) => {return {MemberID, FirstName,LastName}}))
}

exports.getById = async (req, res) => {
  const member = await getMember(req, res);
  if (!member) { return};
  return res.send(member);
  }

exports.create = async (req, res) => {
  if (!req.body.FirstName || 
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.LastName ||
      !req.body.PhoneNumber ||
      !req.body.Email ||
      !req.body.RegistrationDate ||
      !req.body.Active ||
      !req.body.Level) 
  {   return res.status(400).send({error: "One or multiple parameters are missing"});    }

  let newMember = {        
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      Email: req.body.Email,
      RegistrationDate: req.body.RegistrationDate,
      Active: req.body.Active,
      Level: req.body.Level,
  }
  const createdMember = await db.Members.create(newMember);
  res/*.status(201)*/
      .location(`${Utlis.getBaseURL(req)}/members/${createdMember.MemberID}`)
      .sendStatus(201);
}

exports.editById = async (req,res) => {
  const member = await getMember(req, res);
  if (!member) { return };
  if (!req.body.FirstName || 
      !req.body.LastName ||
      !req.body.Address ||
      !req.body.LastName ||
      !req.body.PhoneNumber ||
      !req.body.Email ||
      !req.body.RegistrationDate ||
      !req.body.Active ||
      !req.body.Level) 
  {   return res.status(400).send({error: "One or multiple parameters are missing"});    }

  member.FirstName = req.body.FirstName,
  member.LastName = req.body.LastName,
  member.Address = req.body.Address,
  member.PhoneNumber = req.body.PhoneNumber,
  member.Email = req.body.Email,
  member.RegistrationDate = req.body.RegistrationDate,
  member.Active = req.body.Active,
  member.Level = req.body.Level,
  await member.save();
  return res.status(201)
      .location(`${Utlis.getBaseURL(req)}/members/${member.memberID}`)
      .send(member);
}

exports.deleteById = async (req, res) => {
  const member = await getMember(req,res);
  if (!member) { return };
  await member.destroy();
  res.status(204).send({error: "No Content"});
}

const getMember = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  console.log("id:", idNumber)
  if (isNaN(idNumber)) {
      res.status(400).send({error: `Invalid member ID ${req.params.id}`});
      return null;
  }
  const member = await db.Members.findByPk(idNumber);
  if (!member) {
      res.status(404).send({error: "Member not found"});
      return null;
  }
  return member;
}