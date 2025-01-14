const membersController = require('../controllers/membersController');


module.exports = (app) => {
  app.route("/members")
      .get(membersController.getAll)
      .post(membersController.create)
  app.route("/members/:id")
      .get(membersController.getById)
      .put(membersController.editById)
      .delete(membersController.deleteById)
}