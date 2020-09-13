import { verifySignIn, requireAuth } from '../config/passport';
import { signin, signOut } from '../controllers/authController';

export default function(router) {
  router.post('/signin', verifySignIn, signin);
  router.get('/signout', requireAuth, signOut);
}
