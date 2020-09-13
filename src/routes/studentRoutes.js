import { requireAuth } from '../config/passport';
import { create, findAll, findOne, update, remove } from '../controllers/studentController.js';

export default function(router) {
  // Create a new Student
  router.post('/students', requireAuth, create);

  // Retrieve all Students
  router.get('/students', requireAuth, findAll);

  // Retrieve a single Note with studentId
  router.get('/students/:studentId', requireAuth, findOne);

  // Update a Note with studentId
  router.put('/students/:studentId', requireAuth, update);

  // Delete a Student with studentId
  router.delete('/students/:studentId', requireAuth, remove);
}
