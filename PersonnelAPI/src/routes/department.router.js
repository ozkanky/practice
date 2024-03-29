"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const department = require('../controllers/department.controller')
const permissions=require('../middlewares/permissions')

// URL: /departments

router.route('/')
    .get(permissions.isLogin,department.list)
    .post(permissions.isAdmin,department.create)

router.route('/:id')
    .get(permissions.isLogin,department.read) //, görüntüleme işlemleri için herhangi bir kullanıcı olması yeterli
    .put(permissions.isAdmin,department.update) //,ekleme,silme,güncelleme, gibi işlemler için Admin
    .patch(permissions.isAdmin,department.update)
    .delete(permissions.isAdmin,department.delete)

router.get('/:id/personnels',permissions.isAdminOrLead, department.personnels)

/* ------------------------------------------------------- */
module.exports = router 