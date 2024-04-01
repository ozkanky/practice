"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */
//user Model

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate:(email)=>email.includes('@') && email.includes('.') //, gelen emailin '@' ve '.' olup olmadıgını kontrol eder,
      //,=> validate -> create yaparken otomatik calisir -> update yaparken de calisması icin runValidator ayarı contorllere eklenir
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users", //,küçük harflerle ve cogul
    timestamps: true,
  }
);

/* ------------------------------------------------------- */
// Model:
module.exports = mongoose.model("User", UserSchema);
