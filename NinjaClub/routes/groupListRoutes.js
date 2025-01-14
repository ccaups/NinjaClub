const groupListController = require('../controllers/GroupListController');

module.exports = (app) => {
  app.route("/groups")
      .get(groupListController.getAll)
      .post(groupListController.create)
  app.route("/groups/:id")
      .get(groupListController.getById)
      .put(groupListController.editById)
      .delete(groupListController.deleteById)
}
