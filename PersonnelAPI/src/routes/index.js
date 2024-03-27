"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

//  /auth

router.use("/auth", require("./auth.router"));
//  /token

router.use("/tokens", require("./token.router"));

// // /departments
// app.use('/departments', require('./src/routes/department.router'))
// // /personnels
// app.use('/personnels', require('./src/routes/personnel.router'))

//,route ları ayrı bir dosyaya taşımak için router kullanmamız gerekiyor

// /departments
router.use("/departments", require("./department.router"));
// /personnels
router.use("/personnels", require("./personnel.router"));

/* ------------------------------------------------------- */
module.exports = router;
