import { requireAuth } from '../config/passport';
import { create, findAll, findOne, update, remove } from '../controllers/courseController.js';

export default function(router) {
  // Create a new cour
  router.post('/courses', requireAuth, create);

  // Retrieve all Users
  router.get('/courses', requireAuth, findAll);

  // Retrieve a single Note with courseId
  router.get('/courses/:courseId', requireAuth, findOne);

  // Update a Note with courseId
  router.put('/courses/:courseId', requireAuth, update);

  // Delete a Note with noteId
  router.delete('/courses/:courseId', requireAuth, remove);
}
