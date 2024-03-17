"use strict";

/* -------------------------------------------------------
EXPRESSJS - Error Handler 
------------------------------------------------------- */

const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  if (req?.session?.findOne) {
    //,session da veri var mı(id ve password bulunur)

    const { id, password } = req.session;
    const user = await User.findOne({ _id: id }); //, user model içerisinde findOne ile _id = id
    if (user && user.password == password) {
      //,zaten session.password  şifreli olduğuiçin Encrypt yapmak gerekmiyor
         req.user = user
            req.isLogin = true
    } else {
      //, req.session eşitliği sağlamıyorsa
   req.session = null
      req.isLogin = false
    }
  }
  next()
};
