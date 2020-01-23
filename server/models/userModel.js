const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;


const userSchema = new Schema({
    email: { type: String, required: true},
    firstName: String,
});



// userSchema.pre((next) => {
//     const user = this;
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         if (err) return next(err); 
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             user.password = hash;
//             return next();
//         });
//     });
// });

// userSchema.methods.validatePassword = (input, next) => {
//     const user = this;
//     bcrypt.compare(input, user.password, (err, match) => {
//         if (err) return next(err);
//         if (match) return next();
//         if (!match) throw new Error('your password is incorrect');
//     });
// };

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });






module.exports = mongoose.model('User', userSchema);