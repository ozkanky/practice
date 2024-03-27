"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// app.use(authentication): //,kimlik kontrolu


const Token=require('../models/token.model')


module.exports=async (req,res,next)=>{
  //,piyasada bilinen isimleri
  // Authorization: Token ...
  // Authorization: ApiKey ...
  // Authorization: X-API-KEY ...
  // Authorization: x-auth-token ...
  // Authorization: Bearer ...

 const auth = req.headers?.authorization || null; // Token ...tokenKey...
 const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

 if (tokenKey && tokenKey[0] == "Token") {
   const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
     "userId"
   ); //,populate('userId') metodu, tokenin sahibi olan kullanıcı verisini de almak için kullanılır.
 if (tokenData) req.user = tokenData.userId // Personnel Data
        // console.log(req.user)
    }
  next()
}