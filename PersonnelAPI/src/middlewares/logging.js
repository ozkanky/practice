"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */


// application.use(logging)

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
//,  "fs" modülü (File System) Node.js'de dosya sistemine erişim sağlayan bir modüldür. Bu modül, dosyaları okuma, yazma, düzenleme, silme ve diğer dosya sistemine ilişkin işlemleri gerçekleştirmenizi sağlar. fs modülü, dosya ve dizinlerle ilgili çeşitli işlemleri yapmanıza olanak tanır ve Node.js uygulamalarının dosya sistemiyle etkileşimde bulunmasını sağlar.

// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log',{flags:'a+'})
// }))

//? flags https://nodejs.org/api/fs.html#file-system-flags 
//,  "flags" parametresi, fs.createWriteStream() fonksiyonu ile oluşturulan bir yazma akışı için belirli davranışları belirtmek için kullanılır. Bu parametre, oluşturulan akışın ne tür işlemler gerçekleştireceğini belirler
//+{flags:'a+'} okuma ve ekleme , yoksa dosyayı oluşturma

 const fs = require("node:fs");

 const now = new Date();

 const today = now.toISOString().split("T")[0]; //, toISOString ile stringe çevir ,sonra split ile  aradaki T harfine göre parçala ve bunu index 0 'ıncı ksımını al
 // console.log('TODAY  : ', today);

//  app.use(
//    morgan("combined", {
//      stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }), //, logs klasörü altında day by day kayıt olsturdu
//    })
//  );



module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }), //, logs klasörü altında day by day kayıt olsturdu
});