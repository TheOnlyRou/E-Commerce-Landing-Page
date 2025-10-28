import { Request, Response } from 'express';
import { Newsletter } from '../models/Newsletter';
import { validationResult } from 'express-validator';

/**
 * Subscribe to newsletter
 */
export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email } = req.body;

    // Check if email already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        res.status(409).json({
          success: false,
          message: 'This email is already subscribed to our newsletter',
        });
        return;
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();
        
        res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
        return;
      }
    }

    // Create new subscription
    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter',
      error: error.message,
    });
  }
};

/**
 * Unsubscribe from newsletter
 */
export const unsubscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list',
      });
      return;
    }

    subscription.isActive = false;
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error: any) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter',
      error: error.message,
    });
  }
};

/**
 * Get all newsletter subscribers (Admin only)
 */
export const getSubscribers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active, page = 1, limit = 50 } = req.query;

    const filter: any = {};
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const subscribers = await Newsletter.find(filter)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Newsletter.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error: any) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: error.message,
    });
  }
};

