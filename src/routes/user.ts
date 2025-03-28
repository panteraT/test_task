import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

export default router;