const eventsController = require("../controllers/eventsController");

module.exports = (app) => {
  app.route("/events")
      .get(eventsController.getAll)
      .post(eventsController.create)
  app.route("/events/:id")
      .get(eventsController.getById)
      .put(eventsController.editById)
      .delete(eventsController.deleteById)
}
