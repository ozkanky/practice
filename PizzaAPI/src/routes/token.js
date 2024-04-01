"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();

const token = require("../controllers/token");
/* ------------------------------------------------------- */
// routes/token :

// URL : /tokens

router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .get(token.read)
  .put(token.update)
  .delete(token.delete)
  .patch(token.update);
/* ------------------------------------------------------- */
module.exports = router;
