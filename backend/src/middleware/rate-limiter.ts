import rateLimit from 'express-rate-limit';

// Limit repeated requests to auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Limit repeated requests to newsletter endpoints
export const newsletterRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many newsletter requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});