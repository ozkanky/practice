"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// MongoDB Connection:
const mongoose = require("mongoose");

const dbConnection = function () {
  //connect
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("* DB Connecteion is done"))
    .catch((err) => console.log("* DB Connecteion is not done"));
};
/* ------------------------------------------------------- */
module.exports = {
  mongoose,
  dbConnection,
};
