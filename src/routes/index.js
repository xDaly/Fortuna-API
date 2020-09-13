import { Router } from 'express';
import info from '../../package';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import classRoutes from './classroomRoutes';
import formationRoutes from './formationRoutes';
import courRoutes from './courseRoutes';
import trainerRoutes from './trainerRoutes';

const router = Router();

router.get('/', (req, res) => {
  res.json({ version: info.version });
});

authRoutes(router);
userRoutes(router);
classRoutes(router);
formationRoutes(router);
courRoutes(router);
trainerRoutes(router);

export default router;
