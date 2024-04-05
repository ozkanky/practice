"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// Todo Model : 

const {mongoose}=require('../configs/dbConnection')

const priorities ={
  Low : 'low',
  Normal :'normal',
  High:'high',
}

const TodoSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    priority: {
      type: String,
      enum: {
      values: Object.values(priorities),
        message:'low ,normal, high could be select'
      },
      default:"normal"
    },
    isDone:{
      type:Boolean,
      default:false
    }
  },
  {
    collection: "todos",
    timestamps: true,
  }
);
/*-------------------------------------------------------------*/
module.exports=mongoose.model('Todo',TodoSchema)