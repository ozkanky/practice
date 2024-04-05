"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// Error Handler:


//, This custom error handling middleware is designed to catch errors that occur during the request-response cycle, providing a structured and informative error response to the client
module.exports= (err,req,res,next)=>{ 
  return status(res?.errStatusCode || 500).send({ 
    error: true,
    message: err.message,
    cause:err.cause,
    body:err.body
  })
}