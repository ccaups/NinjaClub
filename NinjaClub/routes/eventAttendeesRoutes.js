const eventAttendeesController = require("../controllers/eventAttendeesController");

module.exports = (app) => {
  app.route("/eventattendees")
      .get(eventAttendeesController.getAll)
      .post(eventAttendeesController.create)
  app.route("/eventattendees/:id")
      .get(eventAttendeesController.getById)
      .put(eventAttendeesController.editById)
      .delete(eventAttendeesController.deleteById)
}
