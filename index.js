const app = require('express')();
const port = 8080
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
var express = require('express');
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/members", (req, res) => { res.send(members)})

app.get("/members/:id", (req,res) => {
    if (typeof members[req.params.id-1]
    === "undefined") {
        return res.status(404).send({error:"Member not found"})
    }
    if (req.params.id == null) {
        return res.status(400).send({error:"Invalid member ID"})
    }
    res.send(members[req.params.id-1])})

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


app.post("/members", (req, res) => {
    if (!req.body.FirstName == null || !req.body.LastName == null || !req.body.Adress == null || !req.body.Phonenumber == null || 
        !req.body.Email == null || !req.body.RegistrationDate == null || !req.body.Active == null ||!req.body.Level == null)
        {
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
        members.push(member);
        res.status(201).location(`${getBaseUrl(req)}/members/${members.length}`)
        .send(member);
    })



app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port})`);})


function getBaseUrl(req) {
    return req.connection && req.connection.encrypted? 'https' : 'http' + `://${req.headers.host}`;
}