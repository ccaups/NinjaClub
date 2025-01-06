require('dotenv').config();

const port = process.env.PORT || 3030;
const host = "localhost";
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const membersRoutes = require("./routes/membersRoutes");
const coachesRoutes = require("./routes/coachesRoutes");
const groupTrainingRoutes = require("./routes/groupTrainingRoutes");
const eventsRoutes = require("./routes/eventsRoutes");
const eventAttendeesRoutes = require("./routes/eventAttendeesRoutes");

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.use("/members", membersRoutes);
app.use("/coaches", coachesRoutes);
app.use("/groupTraining", groupTrainingRoutes);
app.use("/events", eventsRoutes);
app.use("/eventAttendees", eventAttendeesRoutes);


app.get("/", (req, res) => {
    res.send(`Server running. Documentation at <a href="http://${host}:${port}/docs">/docs</a>`);
})

const members = [
    {
        MemberID: 1,
        FirstName: "John2",
        LastName: "Doe",
        Adress: "Kuusk 1 Oks 2",
        Phonenumber: "5556661111",
        Email: "john.doe@example.com",
        RegistrationDate: "01.11.2000",
        Active: true,
        Level: 6
    },
    {
        MemberID: 2,
        FirstName: "Jane",
        LastName: "Smith",
        Adress: "Paju 5 Leht 3",
        Phonenumber: "5557772222",
        Email: "jane.smith@example.com",
        RegistrationDate: "12.06.2005",
        Active: false,
        Level: 4
    },
    {
        MemberID: 3,
        FirstName: "Peter",
        LastName: "Jones",
        Adress: "Mägi 9 Tuba 12",
        Phonenumber: "5558883333",
        Email: "peter.jones@example.com",
        RegistrationDate: "23.03.2010",
        Active: true,
        Level: 5
    }
]

const coaches = [
    {
        CoachID: 1,
        GroupID: "Must vöö",
        FirstName: "Ott",
        LastName:"Tänak",
        Adress: "Kuusk 1 Oks 2",
        Phonenumber: "5556661111",
        Email: "john.doe@example.com"
    },
    {
        CoachID: 2,
        GroupID: "Valge vöö",
        FirstName: "Ott",
        LastName:"Tänak",
        Adress: "Kuusk 1 Oks 2",
        Phonenumber: "5556661111",
        Email: "john.doe@example.com"
    },
]

app.get("/members", async(req, res) => { res.send(members)})

app.get("/members/:id", async(req,res) => {
    if (typeof members[req.params.id-1]
    === "undefined") {
        return res.status(404).send({error:"Member not found"})
    }
    if (req.params.id == null) {
        return res.status(400).send({error:"Invalid member ID"})
    }
    res.send(members[req.params.id-1])
})

app.post("/members", async(req, res) => {
    if (!req.body.FirstName == null || !req.body.LastName == null || !req.body.Adress == null || !req.body.Phonenumber == null || 
        !req.body.Email == null || !req.body.RegistrationDate == null || !req.body.Active == null ||!req.body.Level == null){
        return res.status(400).send({error: "Missing required fields"});
    }

    let newMember = {
        MemberID: createID(),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Adress: req.body.Adress,
        Phonenumber: req.body.Phonenumber,
        Email: req.body.Email,
        RegistrationDate: req.body.RegistrationDate,
        Active: req.body.Active,
        Level: req.body.Level
    }
const createdMember = await db.members.create(newMember);
        res.status(201)
            .location(`${getBaseUrl(req)}/members/${createdMember.MemberID}`)
            .send(createdMember);
})

app.put("/members/:id", async(req, res) => {
    if (req.params.id == null) {
        return res.status(404).send({error:"Member not found"})
    }

    if (!req.body.FirstName == null || !req.body.LastName == null || !req.body.Adress == null || !req.body.Phonenumber == null || 
        !req.body.Email == null || !req.body.RegistrationDate == null || !req.body.Active == null ||!req.body.Level == null){
        return res.status(400).send({error: "Missing required fields"});
    }
    
    let member = {
        MemberID: members.length+1,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Adress: req.body.Adress,
        Phonenumber: req.body.Phonenumber,
        Email: req.body.Email,
        RegistrationDate: req.body.RegistrationDate,
        Active: req.body.Active,
        Level: req.body.Level
    }
    members.splice((req.body.MemberID-1),1,member);
    res.status(201)
        .location(`${getBaseUrl(req)}/members/${members.length}`)
        .send(member);
})

app.get("/coaches", async(req, res) => { res.send(coaches)})

app.get("/coaches/:id", async(req,res) => {
    if (typeof coaches[req.params.id-1]
    === "undefined") {
        return res.status(404).send({error:"Member not found"})
    }
    if (req.params.id == null) {
        return res.status(400).send({error:"Invalid member ID"})
    }
    res.send(coaches[req.params.id-1])
})



app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port})`);})


function getBaseUrl(req) {
    return req.connection && req.connection.encrypted? 'https' : 'http' + `://${req.headers.host}`;
}


async function getMember(req,res) {
    const idNumber = parseInt(req.params.MemberID);
    if (isNaN(idNumber)) {
        res.status(400).send({error: "Invalid member ID"});
        return null;
    }
    const members = await db.members.findByPk({idNumber});
    if (!members) {
        res.status(404).send({error: "Member not found"});
        return null;
    }
    return members;

}