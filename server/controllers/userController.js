const User = require('../models/userModel');
const passport = require('passport')

const userController = {};

userController.createUser = (req, res, next) => {
    User.register(new User({ email: req.body.email, firstName: req.body.firstName }), req.body.password, function(err, user) {
        if (err) {
            return next(err)
        }
        passport.authenticate('local')(req, res, () => {
          return next();
        });
  })
}
 
userController.isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

userController.logIn = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/login' })
    return next();
}

userController.logOut = (req, res, next) => {
  req.logout();
  return res.redirect('/login');
}




module.exports = userController;
