const GroupListController = require("../controllers/groupListController");

module.exports = (app) => {
  app.route("/GroupList")
      .get(GroupListController.getAll)
      .post(GroupListController.create)
  app.route("/GroupList/:id")
      .get(GroupListController.getById)
      .put(GroupListController.editById)
      .delete(GroupListController.deleteById)
}
