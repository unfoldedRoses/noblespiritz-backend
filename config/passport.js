const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('../models');
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'praveen',
};
passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await User.findByPk(payload.id, { include: Role });
        if (!user) {
          return done(null, false);
        }
  
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );