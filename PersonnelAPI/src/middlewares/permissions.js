"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
//! Middleware: permissions

module.exports = {
  isLogin: (req, res, next) => {
    //,kullanıcı girişini kontrol edilecek,kullanıcı girişi yapılmamışsa isLogin girişe izin vermeyecek

    if (req.user && req.user.isActive) {
      //,login olduktan sonra da isActive false olabileceği için isActive kontrolü takrardan yapıloyor
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },
  isAdminOrLead: (req, res, next) => {
    const departmentId = req.params?.id; //,isLead in oldugu byerde departmentId de gelmeli

    if (
      req.user && //,req.user giriş yapmak zorunda
      req.user.isActive && //,req.user isActive olmak zorunda
      (req.user.isAdmin || //,req.user isAdmin olmak zorunda,değilse devamındaki sorgu
        (req.user.isLead && //,req.user isLead olmak zorunda
          req.user.departmentId == departmentId))
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },
  isAdminOwn: (req, res, next) => { //, personel kendi kaydını yönetebiliyor
    const personnelId = req.params?.id;

    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin || req.user._id == personnelId)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin or Record Owner.");
    }
  },
};
