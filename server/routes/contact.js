import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    message: 'Too many messages from this connection. Please try again later.',
  },
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, message } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        message: 'Name, a valid email, and message are required.',
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({
        message: 'Name must be between 2 and 80 characters.',
      });
    }

    if (!emailPattern.test(cleanEmail) || cleanEmail.length > 254) {
      return res.status(400).json({
        message: 'Please provide a valid email address.',
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return res.status(400).json({
        message: 'Message must be between 10 and 3000 characters.',
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;

    if (!apiKey || !recipient) {
      console.error('Email configuration is missing.');
      return res.status(503).json({
        message: 'Email service is not configured yet. Please try again later.',
      });
    }

    // Save to MongoDB when connected. Email notification works independently.
    if (ContactMessage.db.readyState === 1) {
      await ContactMessage.create({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipient],
      replyTo: cleanEmail,
      subject: `Portfolio message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    if (error) {
      console.error('Resend email error:', error.message);
      return res.status(502).json({
        message: 'Could not send your message right now. Please try again later.',
      });
    }

    return res.status(201).json({
      message: 'Message sent successfully. Thank you for reaching out!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;