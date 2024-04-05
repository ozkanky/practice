"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// Todo Controller :

const todoRouter = require("express").Router();
const todo = require("../controllers/todo");
/*------------------------------------------------------- */
// URL/
todoRouter.route("/").get(todo.list).post(todo.create);

// URL/:id
todoRouter
  .route("/:id")
  .get(todo.read)
  .put(todo.update)
  .patch(todo.update)
  .delete(todo.delete);

/*------------------------------------------------------- */
module.exports =todoRouter