import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { PrismaClient } from '@prisma/client';
import todoRouter from './routes/todos';
import authRouter from './routes/auth';
import { httpRequestLoggerMiddleware, errorLoggerMiddleware } from './middleware/logger';
import passport from './config/passport';
import cors from 'cors';

// Environment and App Setup
dotenv.config();
const app = express();
const serverPortFromEnv = process.env.PORT || 3001;

// CORS Middleware - Configure for credentials
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Allow cookies
}));

export const prismaDbClient = new PrismaClient();

// Session Configuration
const pgSession = connectPgSimple(session);
app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'user_sessions',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    httpOnly: true,
    secure: false, // set True when not DEV
    sameSite: 'lax'
  }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Core Middleware Setup
app.use(express.json());
app.use(httpRequestLoggerMiddleware);

// API Routes Setup
app.use("/api/auth", authRouter);
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
