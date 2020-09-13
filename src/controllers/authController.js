import jwt from 'jwt-simple';
import { JWTSECRET } from '../config/env';

const tokenForUser = (user, exp) =>
  jwt.encode(
    {
      sub: user.id,
      exp: exp
    },
    JWTSECRET
  );

export const signin = (req, res) => {
  res.send({
    token: tokenForUser(req.user, Math.round(Date.now() / 1000 + 120 * 60)),
    user: req.user
  });
};

export const signOut = (req, res) => {
  res.status(200).send({ token: 0 });
};
