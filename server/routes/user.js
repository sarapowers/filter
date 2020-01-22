const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',
  userController.isLoggedIn,
  (req, res) => {
      const { _id } = req.user;
      return res.status(200).redirect(`../${_id}`);
  }
 );

//  router.get('/login')

router.get('/login',
(req, res, err) => {
    if (err) return res.send({ err: err });
    return res.sendStatus(200);
})

 router.post('/login', 
  userController.logIn,
  (req, res) => {
    const { _id } = req.user;
    return res.status(200).redirect(`../${_id}`);
  }
 );

 router.post('/createuser', 
  userController.createUser, 
  (req, res) => {
      return res.redirect(`../interests`);
  });

  router.get('/logout', 
    userController.logOut, 
    (req, res) => {
        return res.redirect('../');
    })





module.exports = router;
