"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

// Auth Contoller: //,create update yapmaz --> Login - Logout yapar

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
                    "password": "Aa12345?",
                }
            }
        */
    //, kullanıcı isterse kullanıcı password yada email ile login olur
    const { username, password } = req.body;
    if ((username || email) && password) {
      const user = await User.findOne({
        $or: [{ username }, { email }], //, usename veya email varmı
      });
      if (user && user.password == passwordEncrypt(password)) {
        //,kullanıucının gönderdiigi yalin haldeki sifreyi sifrele ,veritabanındaki sifreyle esitmi kontrol et
        if (user.isActive) {//,kullanıcı aktif mi kontrol et

          //*SIMPLE TOKEN*/

          let tokenData= await Token.findOne({userId:user._id}) //,token veritabanında var mı kontrol et

          if(!tokenData){ 
            tokenData=await Token.create({ //,token veritabanında yoksa token olustur
                userId :user._id, //,kullanıcı id
                token:passwordEncrypt((user.id + Date.now()).toString()) //, token user id + tarih ile olsutur ve encrypt et
            })
           }

          //*SIMPLE TOKEN*/
          res.status(200).send({
              error: false,
              token: tokenData.token,
              user
          })
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
  logout: async (req, res) => {},
};
