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
      //   validate: [(password) =>
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),'Password type is incorrect',
      // ],
      // set:passwordEncrypt //,mongoose da set methodu validate methodundan önce calisir,bu yuzden password validate e encrypt edimis halde gelir,bu sorunu cözmek icin validation set de yapılır
      //? Yöntem-1:
      set: (password) => {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {
          return passwordEncrypt(password);
        } else {
          throw new Error("Password type is not correct.");
        }
      },
      /*--------*
      //? 2.yol
    set: (password) => {
    //, validate methodundan gecerse passwordu encrypt edip retrun yap
        if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {
            return passwordEncrypt(password);
        } else {
            return 'wrong';
        }
    },
        validate: (password) => (password != 'wrong')
    /*--------*/
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      //   validate:(email)=>email.includes('@') && email.includes('.') //, gelen emailin '@' ve '.' olup olmadıgını kontrol eder,
      //   //,=> validate -> create yaparken otomatik calisir -> update yaparken de calisması icin runValidator ayarı contorllere eklenir
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Email type is incorrect", //,
      ],
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
