const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const config = require("../../config").api;
const { findUserById } = require("../user/user.controllers");

//? Passport configs
const passportConfigs = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretOrKey,
};

//? Strategy
passport.use(
  new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded._id)
      .then((data) => {
        if (data) {
          done(null, data);
        } else {
          done(null, false, { message: "Token Incorrect" }); //? User not exist
        }
      })
      .catch((err) => {
        done(err, false); //? Database error
      });
  })
);

module.exports = passport.authenticate("jwt", { session: false });
