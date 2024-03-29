"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- *
//?Morgan log kaydı tutmaya yarayan middleware' dir
//https://expressjs.com/en/resources/middleware/morgan.html
//https://github.com/expressjs/morgan
// $ npm i morgan

const morgan = require("morgan");

// app.use(morgan('combined'))
// app.use(morgan('common'))
// app.use(morgan('short'))
// app.use(
//   morgan(
//     'IP=:remote-addr |:date[clf]] | METHOD=:method | URL=:url | STATUS=:status| LENGTH=:res[content-length] | REF=:referrer | AGENT=:user-agent' ));

//? Write log file :
//,fs modülü (File System) Node.js'de dosya sistemine erişim sağlayan bir modüldür. Bu modül, dosyaları okuma, yazma, düzenleme, silme ve diğer dosya sistemine ilişkin işlemleri gerçekleştirmenizi sağlar. fs modülü, dosya ve dizinlerle ilgili çeşitli işlemleri yapmanıza olanak tanır ve Node.js uygulamalarının dosya sistemiyle etkileşimde bulunmasını sağlar.

// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log',{flags:'a+'})
// }))

//? flags https://nodejs.org/api/fs.html#file-system-flags 
//,flags parametresi, fs.createWriteStream() fonksiyonu ile oluşturulan bir yazma akışı için belirli davranışları belirtmek için kullanılır. Bu parametre, oluşturulan akışın ne tür işlemler gerçekleştireceğini belirler
//+{flags:'a+'} okuma ve ekleme , yoksa dosyayı oluşturma


//! Write log file day by day :
 const fs =require ('node:fs')


 const now= new Date()

 const today=now.toISOString().split('T')[0]        //, toISOString ile stringe çevir ,sonra split ile  aradaki T harfine göre parçala ve bunu index 0 'ıncı ksımını al
// console.log('TODAY  : ', today);


app.use(morgan('combined', {
    stream: 
    fs.createWriteStream(`./logs/${today}.log`,{flags:'a+'}) //, logs klasörü altında day by day kayıt olsturdu
}))
/* ------------------------------------------------------- */
//* DOCUMANTATON

// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen //, benim isstemimi tarar ve otomatik olarak  JSON dosyası olusturur
// $ npm i swagger-ui-express //,JSON dosyasını görsele dönüşütrür
// $ npm i redoc-express

//? SWAGGER
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");

app.use(
  "/documents/swagger", //, swagger dökümanını burakadi URL den yayınla
  swaggerUi.serve, //,swagger ı başlat
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true }, //,token çalıştırma ayarı
  })
);

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logging :
app.use(require("./src/middlewares/logging"));

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- *
// Authontication : (sessionCookies )

// Login/Logout Control Middleware
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) {
        //     req.isLogin = true
        // }
        req.isLogin = user && user.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})

/* ------------------------------------------------------- */
// Authontication : (Simple Token)
app.use(require("./src/middlewares/authentication"));
/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    session: req.session,
    isLogin: req.isLogin,
    user: req.user,
  });
});

// // /departments
// app.use('/departments', require('./src/routes/department.router'))
// // /personnels
// app.use('/personnels', require('./src/routes/personnel.router'))

//, router klasörü içerisindeki index.js

app.use(require("./src/routes"));
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
