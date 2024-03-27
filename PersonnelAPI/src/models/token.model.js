"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "userId": "65343222b67e9681f937f001",
    "token": "...tokenKey..."
}
/* ------------------------------------------------------- */

// Token Model:amacı token saklamak,her kullanıcın varlıgını token ile 

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel", // 'User'
      reqired: true,
      index:true,// sık sık erişebimek için,ram den daha hızlı ulasmayı saglar//veritabanı ilk oluştugunda yapmak mantıklı
      unique: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);



/* ------------------------------------------------------- */

module.exports = mongoose.model("Token", TokenSchema);