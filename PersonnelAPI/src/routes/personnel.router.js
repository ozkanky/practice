"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const permissions = require("../middlewares/permissions");

/* ------------------------------------------------------- */

const personnel = require('../controllers/personnel.controller')

// URL: /personnels



router.route('/')
    // .get(permissions.isAdmin,personnel.list)
    .get(personnel.list)
    .post(personnel.create)

router
  .route("/:id")
  .get(permissions.isAdminOwn, personnel.read)
  .put(permissions.isAdminOwn, personnel.update)
  .patch(permissions.isAdminOwn, personnel.update)
  .delete(permissions.isAdminOwn,permissions.isAdmin, personnel.delete);

/* ------------------------------------------------------- */
module.exports = router