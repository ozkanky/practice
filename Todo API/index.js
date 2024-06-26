"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */


const express = require("express");
const app = express();
/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations :

const {dbConnection} = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares : 

// Accept JSON : 
app.use(express.json())

/* ------------------------------------------------------- */
// Routes :

app.all('/',(req,res)=>{
    res.send({
        error:false,
        message:'Welcome to TODO API',
        
    })
})
app.use(require('./src/routes/todo'))

/* ------------------------------------------------------- */
// Error Handler : 
app.use(require('./src/middlewares/errorHandler'))

/* ------------------------------------------------------- */
// RUN SERVER:

app.listen(PORT, () => console.log("http:127.0.0.1:" + PORT));
