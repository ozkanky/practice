"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */

const express=require('express')
app =express()
/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env: 
require('dotenv').config()
const PORT =process.env.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')



/* ------------------------------------------------------- */

/* ------------------------------------------------------- */