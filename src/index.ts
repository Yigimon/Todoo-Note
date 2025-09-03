import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import todoRoutes from './routes/todos';
/*
 * ✅ AKTUELLER SERVER-STATUS:
 * 
 * 1. ✅ API-Routes sind verbunden! (Zeile 33)
 * 2. ❌ Database Migration muss ausgeführt werden:
 *    -> pnpm prisma:migrate
 * 
 * 3. ❌ Controller müssen vervollständigt werden
 * 4. ❌ Später: Authentifizierung hinzufügen
 */

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;  // ✅ Zurück auf Port 3000
export const prisma = new PrismaClient();

// Basic Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use("/api/todos", todoRoutes);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todoo-Note Backend API',
    status: 'running'
  });
});

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'Server is Online', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'Server is not online', database: 'disconnected' });
  }
});

// Error Handlers
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
