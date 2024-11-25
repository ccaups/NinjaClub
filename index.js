const app = require('express')();
const port = 8080
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require("./docs/swagger.json");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get("/members", (req, res) => { res.send(members)})

app.get("/members/:id", (req,res) => {
    res.send(members[req.params.id])
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
        irstName: "Peter",
        LastName: "Jones",
        Adress: "Mägi 9 Tuba 12",
        Phonenumber: "5558883333",
        Email: "peter.jones@example.com",
        RegistrationDate: "23.03.2010",
        Active: true,
        Level: 5
    }
]





app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port})`);})