"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
    //, kullanıcı isterse kullanıcı password yada email ile login olur
    const { username, email, password } = req.body;

    if ((username || email) && password) {

      const user = await User.findOne({ $or: [{ username }, { email }] }); //, $or: [{ username }, { email }] usename veya email varmı

      if (user && user.password == passwordEncrypt(password)) {
        //,kullanıucının gönderdiigi yalin haldeki sifreyi sifrele ,veritabanındaki sifreyle esitmi kontrol et
        if (user.isActive) {
          //,kullanıcı aktif mi kontrol et
          /* SIMPLE TOKEN */

          let tokenData = await Token.findOne({ userId: user.id }); //,token veritabanında var mı kontrol et

          if (!tokenData)
            tokenData = await Token.create({
              //,token veritabanında yoksa token olustur
              userId: user.id, //,kullanıcı id
              token: passwordEncrypt(user.id + Date.now()), //, token user id + tarih ile olsutur ve encrypt et
            });

          /* SIMPLE TOKEN */

          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    const auth = req.headers?.authorization; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
    const result = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
      result,
    });
  },
};
//