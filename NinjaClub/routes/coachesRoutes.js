const coachesController = require('../controllers/coachesController');


module.exports = (app) => {
  app.route("/coaches")
      .get(coachesController.getAll)
      .post(coachesController.create)
  app.route("/coaches/:id")
      .get(coachesController.getById)
      .put(coachesController.editById)
      .delete(coachesController.deleteById)
}
