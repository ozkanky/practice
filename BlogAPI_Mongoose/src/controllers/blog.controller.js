"use strict";
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

require("express-async-errors");

const { BlogCategory, BlogPost } = require("../models/blog.model");
const { options } = require("../routes/user.router");

// module.exports={
//     "key":"value",
//     "key2":"value",

// }
// module.exports.key:"value"
// module.exports.key2:"value"

module.exports.BlogCategory = {
  list: async (req, res) => {
    // const data = await BlogCategory.find();
    const data = await res.getModelList(BlogCategory);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogCategory),
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newdata = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {
    /*--------------------------*/
    /* FILTERING & SEARCHING & SORTING & PAGINATION *

//! FILTERING:
const filter = req.query?.filter || {};
// console.log(filter);

//!  SEARCHING :
// URL?search[key1]=value1&search[key2]=value2
// https://www.mongodb.com/docs/manual/reference/operator/query/regex/
//, title ı test 0 değil , title içinde test 0 geçen i bul
const search = req.query?.search || {}; //,search içinde geçen ,eşittir değil
// console.log(search);

//+ title =test 0 şeklinde değil ,title içinde test 0 aramasnı sağlamak icin
//? { title: 'test', content: 'test' } -> { title: { $regex: 'test' }, content: { $regex: 'test' } }

for (let key in search) {
    // search['title'] = { $regex: search['title'] }//,search title ı regex title'a donustur
    
    search[key] = { $regex: search[key], $options: "i" }; ///+ regex  title: 'test ifadesini data icerisnde ariyor, regex olmazsa eşleştirip arar /* $options:'i'/*büyük harf duyarlılıgınıkaldırmak 
}
// console.log(search);

//!  SORTING:

// URL?sort[key1]=asc&sort[key2]=desc
// 1: A-Z - -1: Z-A // deprecated
// asc: A-Z - desc: Z-A

const sort = req.query?.sort || {};
// console.log(sort);

//! PAGINATION
// URL?page=3&limit=10

//, LIMIT
let limit = Number(req.query?.limit);

limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);
console.log('limit',limit);
//, PAGE:
let page = Number(req.query?.page)
// page = page> 0 ? page : 1
page = page> 0 ? (page -1) : 0 //, Backend 'de sayfa sayisi her zaman page-1 olarak hesaplanmali

console.log('page',page);

//, SKIP //+ LIMIT 20,10

let skip=Number(req.query?.skip)

skip=skip>0 ? skip : (page * limit);
console.log('skip',skip);
/* FILTERING & SEARCHING & SORTING & PAGINATION */

    //, BlogPost tüm dataları getir
    // const data = await BlogPost.find({published:true});
    // const data = await BlogPost.find(filter);
    // const data = await BlogPost.find({ ...filter, ...search }); //, find içerisinde hem filter ,hem de search yapabilmek için spread kullan.
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort);
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit )
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).skip(10).limit(limit )//,skip 10 kayıt atalayacak lmit kadar sayi getirecek

    // const data = await BlogPost.find().populate('blogCategoryId')

    const data = await res.getModelList(BlogPost, 'blogCategoryId');

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogCategory),

      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate('blogCategoryId')
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);
    const newdata = await BlogPost.findOne({ _id: req.params.postId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
