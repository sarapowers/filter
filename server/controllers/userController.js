const User = require('../models/userModel');
const mongoose = require('mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


const userController = {};

userController.createUser = (req, res, next) => {
    console.log(req.body);
    User.register(new User({ email: req.body.email, firstName: req.body.firstName}), req.body.password, function(err, user) {
        console.log('in the regiser');
        if (err) {
            console.log('error while user register!', err);
            return next(err)
        }
        return next();

  })
}
 
userController.isLoggedIn = (req, res, next) => {
    if (req.user) return next();
    return res.redirect('user/login');
}


userController.logIn = (req, res, next) => {
    console.log('in the authenticate funciton');
    console.log(req.body);
   passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      // *** Display message using Express 3 locals
      req.session.message = info.message;
      console.log(info.message);
      return res.send('didnt log in');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('logged in');
    });
  })(req, res, next);
   };




userController.logOut = (req, res, next) => {
  req.logout();
  return res.redirect('/');
}




module.exports = userController;
