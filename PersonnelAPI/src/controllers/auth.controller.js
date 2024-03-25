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
      const user = await Personnel.findOne({ username, password });
      if (user) {
        /*SESSION *
        // Set Session:
        req.session = {
          id: user._id,
          password: user.password,
        };
        // Set Cookie:
        if (req.body?.rememberMe) {
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        }
        /*SESSION */
        /*//!---TOKEN */
        //,token varmı
        let tokenData = await Token.findOne({ userId: user._id });

        //,eger token yoksa olustur
        if (!tokenData) {
          const tokenKey = passwordEncrypt(user._id + Date.now());
          // console.log(tokenKey);
          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }

        /*//!TOKEN */

        res.status(200).send({
          error: false,
          token: tokenData.token,
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
    //!TOKEN//

    //!TOKEN//
    res.status(200).send({
      error: false,
      message: "Logout: Sessions Deleted.",
    });
  },
};
