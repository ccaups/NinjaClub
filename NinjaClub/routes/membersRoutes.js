const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");


router.get("/", membersController.getAll);


router.get("/:id", membersController.getById);


router.post("/", membersController.create);


router.put("/:id", membersController.editById);


router.delete("/:id", membersController.deleteById);

module.exports = router;
