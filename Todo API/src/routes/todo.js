"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// Todo Controller :

const router = require("express").Router();
const todo = require("../controllers/todo");
/*------------------------------------------------------- */
// URL/
router.route("/todos").get(todo.list).post(todo.create);

// URL/:id
router
  .route("/todos/:id")
  .get(todo.read)
  .put(todo.update)
  .patch(todo.update)
  .delete(todo.delete);

/*------------------------------------------------------- */
module.exports =router