"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Mongoose
------------------------------------------------------- */
// Todo Controller :

const { mongoose } = require("../configs/dbConnection");
const Todo = require("../models/todo");

module.exports = {
  list: async (req, res) => {
    const data = await Todo.find({});
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await Todo.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Todo.findOne({_id:req.params.id});
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Todo.updateOne({_id:req.params.id},req.body,{
      runValidators:true
    });
    
    res.status(202).send({
      error: false,
      data,
    });
  },
  delete: async (req, res) => {
    const data = await Todo.deleteOne({_id:req.params.id})

     res.status(data.deletedCount ? 204 : 404).send({
       error: !data.deletedCount,
       data,
     });
  },
};
