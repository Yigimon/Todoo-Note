import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

/*
 * TODO: NÄCHSTE SCHRITTE FÜR DEN SERVER
 * 
 * 1. ❌ WICHTIGSTER SCHRITT: API-Routes einbinden!
 *    -> import todoRoutes from './routes/todos';
 *    -> app.use('/api/todos', todoRoutes);
 * 
 * 2. ❌ Database Migration ausführen:
 *    -> pnpm prisma:migrate
 * 
 * 3. ❌ Testen ob API funktioniert:
 *    -> GET http://localhost:3000/api/todos
 * 
 * 4. ❌ Später: Authentifizierung hinzufügen
 *    -> Session & Passport wieder einbauen
 */

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

// Basic Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todoo-Note Backend API',
    status: 'running'
  });
});

// TODO: HIER FEHLEN DIE API-ROUTES!
// NÄCHSTER SCHRITT: Diese Zeilen hinzufügen:
// import todoRoutes from './routes/todos';
// app.use('/api/todos', todoRoutes);
// 
// Dann funktionieren diese Endpunkte:
// GET    /api/todos     -> Alle Todos
// POST   /api/todos     -> Neues Todo
// GET    /api/todos/:id -> Ein Todo
// PUT    /api/todos/:id -> Todo updaten  
// DELETE /api/todos/:id -> Todo löschen

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
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
