import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many messages from this connection. Please try again later.' },
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, message } = req.body ?? {};
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ message: 'Name, a valid email, and message are required.' });
    }
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({ message: 'Name must be between 2 and 80 characters.' });
    }
    if (!emailPattern.test(cleanEmail) || cleanEmail.length > 254) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return res.status(400).json({ message: 'Message must be between 10 and 3000 characters.' });
    }
    if (mongooseUnavailable()) return res.status(503).json({ message: 'Contact storage is not connected yet. Please try again later.' });
    await ContactMessage.create({ name: cleanName, email: cleanEmail, message: cleanMessage });
    return res.status(201).json({ message: 'Message received. Thank you for reaching out!' });
  } catch (error) {
    next(error);
  }
});

function mongooseUnavailable() {
  // Importing the model does not connect automatically; inspect the shared Mongoose connection state.
  return ContactMessage.db.readyState !== 1;
}

export default router;
