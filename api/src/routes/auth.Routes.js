import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/auth.controllers.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);
router.get('/users', protect, getAllUsers);
router.delete('/users/:id', protect, deleteUser);

export default router;
