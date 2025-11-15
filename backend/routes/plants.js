import express from 'express';
import {
  getPlants,
  getPlantById,
  getFeaturedPlants,
  getCategories
} from '../controllers/plantController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getPlants);
router.get('/featured', protect, getFeaturedPlants);
router.get('/categories', protect, getCategories);
router.get('/:id', protect, getPlantById);

export default router;