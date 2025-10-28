import { Router } from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/newsletterController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe to newsletter
 * @access  Public
 */
router.post(
  '/subscribe',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ],
  subscribe
);

/**
 * @route   POST /api/newsletter/unsubscribe
 * @desc    Unsubscribe from newsletter
 * @access  Public
 */
router.post(
  '/unsubscribe',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ],
  unsubscribe
);

/**
 * @route   GET /api/newsletter/subscribers
 * @desc    Get all newsletter subscribers
 * @access  Private/Admin
 */
router.get('/subscribers', authenticate, requireAdmin, getSubscribers);

export default router;

