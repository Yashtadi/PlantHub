import express from 'express';
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateAddresses
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.put('/addresses', protect, updateAddresses);

export default router;
