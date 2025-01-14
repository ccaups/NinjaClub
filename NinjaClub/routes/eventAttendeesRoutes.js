const eventAttendeesController = require("../controllers/eventAttendeesController");

module.exports = (app) => {
  app.route("/eventAttendees")
      .get(eventAttendeesController.getAll)
      .post(eventAttendeesController.create)
  app.route("/eventAttendees/:id")
      .get(eventAttendeesController.getById)
      .put(eventAttendeesController.editById)
      .delete(eventAttendeesController.deleteById)
}
