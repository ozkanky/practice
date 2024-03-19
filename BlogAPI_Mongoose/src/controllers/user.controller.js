"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors");

const User = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    // const data = await User.find();
    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      //, email &&password kontrolü

      // const user=await User.findOne({email})//, user modelinde finOne yap //!mail &password geldiyse
      const user = await User.findOne({ email: email }); //! mail sorgusu eşleşme durumu

      if (user && user.password == passwordEncrypt(password)) {
        //,böylebir user buldu mu yani veritabanında şifrenlenmi password ile kullanıcının gönderdiği eşitmi

        //! SESSİON
        // req.session = {
        //   email: user.email,
        //   password: user.password,
        // };
        // req.session.email = user.email; 
        req.session.id = user.id;
        req.session.password = user.password;

        //! COOKİES
        //,RemindME
        if(req.body?.remindMe){
            req.session.remindMe=req.session.remindMe
            //, SET maxAge
            req.sessionOptions.maxAge = 1000 *60 *60 *24* 3  //, 3 days
        }
       
        //!kullanıcı login olmuştur
        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Email and password are requider");
      }
    } else {
      //,email &password gelmediyse
      res.errorStatusCode = 401;
      throw new Error("Email and password are requider");
    }
  },
  logout: async (req, res) => {

    req.session = null; //,session destroy:
    //!kullanıcı logout olmuştur
    res.status(200).send({
      error: false,
      message: "Logout OK",
    
    });
  },
};
