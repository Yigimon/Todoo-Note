import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import todoRouter from './routes/todos';
import { httpRequestLoggerMiddleware, errorLoggerMiddleware } from './middleware/logger';

// Environment and App Setup
dotenv.config();
const app = express();
const serverPortFromEnv = process.env.PORT || 3001;
export const prismaDbClient = new PrismaClient();

// Core Middleware Setup
app.use(express.json());
app.use(httpRequestLoggerMiddleware);

// API Routes Setup
app.use("/api/todos", todoRouter);

// Health Check Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todoo-Note Backend API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', async (req, res) => {
  try {
    await prismaDbClient.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'Server is Online', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (dbConnectionError) {
    console.error('DB Health Check Failed:', dbConnectionError);
    res.status(500).json({ 
      status: 'Server is not online', 
      database: 'disconnected',
      timestamp: new Date().toISOString()
    });
  }
});

// Error Handling Middleware
app.use(errorLoggerMiddleware);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: `YAhüüüü die Route gibt scheinbar nicht!!! Sieh zu das du Land gewinsch sonst, vergess ih mih. Gölllll jaaa`, 
    requestedPath: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Start HTTP Server
app.listen(serverPortFromEnv, () => {
  console.log(`🚀 Todoo-Note API Server running on http://localhost:${serverPortFromEnv}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
});
