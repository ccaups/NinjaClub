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
});