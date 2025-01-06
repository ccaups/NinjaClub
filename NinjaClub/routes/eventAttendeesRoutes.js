const express = require("express");
const router = express.Router();
const eventAttendeesController = require("../controllers/eventAttendeesController");


router.get("/", eventAttendeesController.getAll);


router.get("/:eventId/:memberId", eventAttendeesController.getById);

router.post("/", eventAttendeesController.create);


router.put("/:eventId/:memberId", eventAttendeesController.editById);


router.delete("/:eventId/:memberId", eventAttendeesController.deleteById);

module.exports = router;
