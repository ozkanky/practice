"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

/* ------------------------------------------------------- *
{
    "username": "testF0",
    "password": "1234"
}
/* ------------------------------------------------------- */

const personnel = require("../controllers/auth.controller");

// URL: /auth

// Login/logout:
router.post("/login", personnel.login);
router.all("/logout", personnel.logout);



/* ------------------------------------------------------- */
module.exports = router;
