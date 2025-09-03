/*
 * TODO: DIESE ROUTES SIND BEREIT ABER NICHT VERBUNDEN!
 * 
 * ✅ Routes sind definiert
 * ✅ Controller sind verlinkt  
 * ✅ Validation ist eingebaut
 * 
 * ❌ PROBLEM: Diese Routes sind nicht mit dem Server verbunden!
 * 
 * LÖSUNG: In src/index.ts hinzufügen:
 * import todoRoutes from './routes/todos';
 * app.use('/api/todos', todoRoutes);
 * 
 * DANN FUNKTIONIEREN:
 * GET    /api/todos     -> Alle Todos
 * POST   /api/todos     -> Neues Todo erstellen
 * GET    /api/todos/:id -> Ein Todo abrufen
 * PUT    /api/todos/:id -> Todo updaten
 * DELETE /api/todos/:id -> Todo löschen
 * GET    /api/todos/user/:userId -> Alle Todos eines Users
 */

import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validate } from '../middleware/validation';
import { createTodoSchema, updateTodoSchema, todoParamsSchema, userParamsSchema } from '../schemas';

const router = Router();

// GET /api/todos - Alle Todos abrufen
router.get('/api/todos', TodoController.getAllTodos);

// POST /api/todos - Neues Todo erstellen
router.post('/api/todos', validate(createTodoSchema), TodoController.createTodo);

// GET /api/todos/:id - Spezifisches Todo abrufen
router.get('/api/todos:id', validate(todoParamsSchema), TodoController.getTodoById);

// PUT /api/todos/:id - Todo aktualisieren
router.put('/api/todos/:id', validate(todoParamsSchema.merge(updateTodoSchema)), TodoController.updateTodo);

// DELETE /api/todos/:id - Todo löschen
router.delete('/api/todos/:id', validate(todoParamsSchema), TodoController.deleteTodo);

// GET /api/todos/user/:userId - Alle Todos eines Users abrufen
router.get('/api/todus/user/:userId', validate(userParamsSchema), TodoController.getTodosByUser);

export default router;
