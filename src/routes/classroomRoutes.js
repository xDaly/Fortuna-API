import { requireAuth } from '../config/passport';
import { create, findAll, findOne, update, remove } from '../controllers/classroomController.js';

export default function(router) {
  // Create a new class
  router.post('/classrooms', requireAuth, create);

  // Retrieve all Users
  router.get('/classrooms', requireAuth, findAll);

  // Retrieve a single Note with classroomId
  router.get('/classrooms/:classroomId', requireAuth, findOne);

  // Update a Note with classroomId
  router.put('/classrooms/:classroomId', requireAuth, update);

  // Delete a Note with noteId
  router.delete('/classrooms/:classroomId', requireAuth, remove);
}
