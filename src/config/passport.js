import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { JWTSECRET } from './env';

export const verifySignIn = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(401).json({ code: 147, error: 'email cannot be empty' });
    }

    if (!req.body.password) {
      return res.status(401).json({ code: 103, error: 'Password cannot be empty' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ code: 143, error: 'Wrong email' });
    }

    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ code: 144, error: 'Wrong password' });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWTSECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub).then(
    user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    },
    err => done(err, false)
  );
});

passport.use(jwtLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
