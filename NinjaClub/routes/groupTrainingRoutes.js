const groupTrainingController = require("../controllers/GroupTrainingController");

module.exports = (app) => {
  app.route("/groupTraining")
      .get(groupTrainingController.getAll)
      .post(groupTrainingController.create)
  app.route("/groupTraining/:id")
      .get(groupTrainingController.getById)
      .put(groupTrainingController.editById)
      .delete(groupTrainingController.deleteById)
}
