"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

//! Route'ları atyrı bir dosyaya taşımak için toute kullanlımlaı

//auth
router.use("/auth", require("./auth.router")); 


//tokens
router.use("/tokens", require("./token.router"));

//departments
router.use("/departments", require("./department.router"));

//personnels
router.use("/personnels", require("./personnel.router"));

module.exports=router