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
    const { username, password } = req.body;

    if (username && password) {
      //, findOne, passwordu modeldeki set metodundaki encrypt i kullanarak db'de filtreleme yapar
      const user = await Personnel.findOne({ username, password });
      if (user) {
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
    /*SESSION*

    // Set session to null:
    req.session = null;

    /*SESSION*/

    /*TOKEN*/
    //! Logout Token
    //,logut yaparken token silinecek

    //?1. YONTEM

    // await Token.deleteOne({userId:req.user.id})

    //? 2.YONTEM
      //,her  kullanıcıya bir token vermek istersek
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0] == "Token") {
      const tokenData = await Token.deleteOne({ token: tokenKey[1] })
     
    }

    /*TOKEN*/
    res.status(200).send({
      error: false,
      // message: "Logout: Sessions Deleted.",
      message: "Logout: Token Deleted.",
    });
  },
};
