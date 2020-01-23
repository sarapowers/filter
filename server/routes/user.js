const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport')
const User = require('../models/userModel')






// router.get('/login',
// (req, res, err) => {
//     if (err) return res.send({ err: err });
//     return res.sendStatus(200);
// })

 router.post('/login', 
  userController.logIn,
  (req, res) => {
      return res.send(req.body);
  })

 router.post('/createuser', 
  userController.createUser, 
  (req, res) => {
      return res.send('created user');
  });

  router.get('/logout', 
    userController.logOut, 
    (req, res) => {
        return res.redirect('../');
    })

    router.get('/login',
    userController.isLoggedIn,
    (req, res) => {
        const { _id } = req.user;
        return res.status(200).redirect(`/news`);
    }
   );



module.exports = router;
