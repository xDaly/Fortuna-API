import { requireAuth } from '../config/passport';
import { create, findAll, findOne, update, remove } from '../controllers/formationController.js';

export default function(router) {
  // Create a new formation
  router.post('/formations', requireAuth, create);

  // Retrieve all Users
  router.get('/formations', requireAuth, findAll);

  // Retrieve a single Note with formationId
  router.get('/formations/:formationId', requireAuth, findOne);

  // Update a Note with formationId
  router.put('/formations/:formationId', requireAuth, update);

  // Delete a Note with noteId
  router.delete('/formations/:formationId', requireAuth, remove);
}
