import { requireAdmin } from '../config/roles';
import { requireAuth } from '../config/passport';
import { create, findAll, findOne, update, remove, upload, saveFile } from '../controllers/userController.js';
import { createNoPermission } from '../controllers/userController';

export default function(router) {
  // Create a new user without permissions!
  router.post('/register', createNoPermission);

  // Create a new user
  router.post('/users', requireAuth, requireAdmin, create);

  // Retrieve all Users
  router.get('/users', requireAuth, requireAdmin, findAll);

  // Retrieve a single User with userId
  router.get('/users/:userId', requireAuth, requireAdmin, findOne);

  // Update a User with userId
  router.put('/users/:userId', requireAuth, requireAdmin, upload, saveFile, update);

  // Delete a User with userId
  router.delete('/users/:userId', requireAuth, requireAdmin, remove);
}
