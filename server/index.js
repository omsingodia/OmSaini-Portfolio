import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resumeDir = path.join(__dirname, 'resumes');

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()),
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'om-saini-portfolio-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not-connected',
  });
});

app.use('/api/contact', contactRoutes);

app.get('/api/resume/pdf', (_req, res) => {
  res.download(path.join(resumeDir, 'om-saini-cv.pdf'), 'Om_Saini_CV.pdf');
});
app.get('/api/resume/docx', (_req, res) => {
  res.download(path.join(resumeDir, 'om-saini-cv.docx'), 'Om_Saini_CV.docx');
});

app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  console.error('API error:', error.message);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

async function start() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
      console.log('MongoDB connected.');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      console.error('API will start, but contact submissions will return a service-unavailable response until MongoDB is configured.');
    }
  } else {
    console.warn('MONGODB_URI is missing. Contact storage is not connected; configure server/.env.');
  }
  app.listen(PORT, () => console.log(`Portfolio API listening on http://localhost:${PORT}`));
}

start();
