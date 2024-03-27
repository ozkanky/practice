"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// // /departments
// app.use('/departments', require('./src/routes/department.router'))
// // /personnels
// app.use('/personnels', require('./src/routes/personnel.router'))

//,route ları ayrı bir dosyaya taşımak için router kullanmamız gerekiyor

// /departments
router.use('/departments', require('./department.router'))
// /personnels
router.use('/personnels', require('./personnel.router'))

//  /token

router.use('/tokens', require('./token.router'))







/* ------------------------------------------------------- */
module.exports=router