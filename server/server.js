const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');


const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://parasowers:5XXaWpDab50BMIfh@filter-nganz.mongodb.net/test?retryWrites=true&w=majority';

const userRouter = require('./routes/user');
const interestRouter = require('./routes/interests');

//parse all incoming req 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'testing solo',
  cookie: { maxAge: 2628000000 },
  store: new (require('express-sessions'))({
      storage: 'mongodb',
  })
}));
app.use(passport.initialize()); 
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`
    ********* FLOW TEST **********
    MEDTHOD: ${req.method}
    URL: ${req.url}
    BODY: ${JSON.stringify(req.body)}
  `)
  return next();
});

// if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
// };

app.use('/user', userRouter);
app.use('/interests', interestRouter);





passport.use('local', new LocalStrategy({
      usernameField: 'email'
  },
  function (email, password, done) {
      User.findOne({
          email: email,
      }, function (err, user) {
          if (err) {
              return done(err)
          }
          // Return if user not found in database
          if (!user) {
              return done(null, false, {
                  message: 'User not found'
              })
          }
          // Return if password is wrong
          // if (!user.validatePassword(password)) {
          //     return done(null, false, {
          //         message: 'Password is wrong'
          //     })
          // }
          // If credentials are correct, return the user object
          return done(null, user)
      })
  }
  ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", err => {
  console.error(err.message);
});





app.get('/', 
(req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));


app.get('*', (req, res) => {
    return res.sendStatus(404);
  });


app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    console.log(errorObj.message);
    return res.status(errorObj.status).json(errorObj.message);
  })


app.listen(port, () => console.log(`Solo-project is listening on port ${port}`));

module.exports = app;