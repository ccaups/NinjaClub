const {db} = require("../db");
const Utlis = require("./utlis");


exports.getAll = async (req, res) => { 
    const members = await db.Members.findAll();

    res
    .send(members
        .map(({MemberID, FirstName,LastName}) => {return {MemberID, FirstName,LastName}}))
}

exports.getById = async (req, res) => {
    // Validate the presence of the required parameter (e.g., ID)
    if (!req.params.id) {
      return res.status(400).send({ error: "Missing member ID parameter." });
    }

    // Fetch the member
    const member = await getMember(req, res);

    // Return 404 if the member is not found
    if (!member) {
      return res.status(404).send({ error: "Member not found." });
    }

    // Return the member data
    return res.status(200).send(member);
};


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

  // Return 404 if member is not found
  if (!member) {
    return res.status(404).send({ error: "Member not found" });
  }

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
  // Check if ID is provided
  if (!req.params.id) {
    return res.status(400).send({ error: "ID is required" });
  }

  // Attempt to retrieve the member
  const member = await getMember(req, res);
  if (!member) {
    return res.status(404).send({ error: "Member does not exist" });
  }

  // Delete the member if found
  await member.destroy();
  res.status(204).send({error: "Member deleted successfully"});
};

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