const express = require("express");
const router = express.Router();
const groupTrainingController = require("../controllers/GroupTrainingController");


router.get("/", groupTrainingController.getAll);


router.get("/:id", groupTrainingController.getById);


router.post("/", groupTrainingController.create);


router.put("/:id", groupTrainingController.editById);


router.delete("/:id", groupTrainingController.deleteById);

module.exports = router;
