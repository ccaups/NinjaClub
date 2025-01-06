const express = require("express");
const router = express.Router();
const coachesController = require("../controllers/CoachesController");


router.get("/", coachesController.getAll);


router.get("/:id", coachesController.getById);


router.post("/", coachesController.create);


router.put("/:id", coachesController.editById);


router.delete("/:id", coachesController.deleteById);

module.exports = router;
