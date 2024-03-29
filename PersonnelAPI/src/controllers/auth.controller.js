"use strict";
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {


  // LOGIN & LOGOUT

  login: async (req, res) => {
    //, bir swagger a gruplama yapmak için komut #swagger.tags
    //, bir swagger a özet yapmak için komut #swagger.summary
    //, bir swagger a özet yapmak için komut #swagger.description

    /*
 
#swagger.tags['Authentication']
#swagger.summary='Login
#swagger.description = 'Login user  name and password
#swagger.parameters['body]={
  in:'body',
  required:'true, 
  required: 'true',
            schema: {
                username: 'testF0',
                password:'1234'
            }
}
*/
    const { username, password } = req.body;

    if (username && password) {
      //, findOne, passwordu modeldeki set metodundaki encrypt i kullanarak db'de filtreleme yapar
      const user = await Personnel.findOne({ username, password });
      if (user && user.isActive) {
        /*SESSION*

        // Set Session:
        req.session = {
          id: user._id,
          password: user.password,
        };
        // Set Cookie:
        if (req.body?.rememberMe) {
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        }

        /*SESSION*/
        /*TOKEN*/
        //!TOKEN*/

        //?token işlemi yapacaksak token modele ihtiyacımız var :require

        //, token daha önceden olusturulmusmu var/yokmu kontrolu

        //*token varmı
        let tokenData = await Token.findOne({ userId: user._id });
        //* eger yoksa
        if (!tokenData) {
          const tokenKey = passwordEncrypt(user._id + Date.now()); //?kullacıya benzersizbir token olusturmak icin
          // console.log(tokenKey);

          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }

        /*TOKEN*/
        res.status(200).send({
          error: false,
          token: tokenData.token, //,FE ye vermek  için
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry username and password.");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Delete Token'
        */

            
    /*SESSION*

    // Set session to null:
    req.session = null;

    /*SESSION*/

    /*TOKEN*/
    //! Logout Token
    //,logut yaparken token silinecek

    //?1. YONTEM
    //, Her kullanıcı için sadece 1 adet token var ise (tüm cihazlardan çıkış yap):

    //const deleted= await Token.deleteOne({userId:req.user.id})

    //? 2.YONTEM
    //,Her kullanıcı için 1'den fazla token var ise (çoklu cihaz):
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    let deleted = null;

    if (tokenKey && tokenKey[0] == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
    }

    /*TOKEN*/
    res.status(200).send({
      error: false,
      // message: "Logout: Sessions Deleted.",
      message: "Logout: Token Deleted.",
      deleted,
    });
  },
};
