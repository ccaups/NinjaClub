const membersController = require('../controllers/membersController');


module.exports = (app) => {
  app.route("/members")
      .get(membersController.getAll)
      .post(membersController.create)
  app.route("/members/:MemberID")
      .get(membersController.getById)
      .put(membersController.editById)
      .delete(membersController.deleteById)
}