const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");


router.get("/", eventsController.getAll);


router.get("/:id", eventsController.getById);


router.post("/", eventsController.create);


router.put("/:id", eventsController.editById);


router.delete("/:id", eventsController.deleteById);

module.exports = router;
