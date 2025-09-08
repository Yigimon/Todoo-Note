/*
 * TODO ROUTES - READY BUT NOT CONNECTED TO SERVER!
 * 
 * ✅ Routes are defined
 * ✅ Controllers are linked  
 * ✅ Validation is implemented
 * 
 * ❌ PROBLEM: These routes are not connected to the server!
 * 
 * SOLUTION: Add to src/index.ts:
 * import todoRoutes from './routes/todos';
 * app.use('/api/todos', todoRoutes);
 * 
 * THEN THESE WILL WORK:
 * GET    /api/todos     -> Get all todos
 * POST   /api/todos     -> Create new todo
 * GET    /api/todos/:id -> Get single todo
 * PUT    /api/todos/:id -> Update todo
 * DELETE /api/todos/:id -> Delete todo
 * GET    /api/todos/user/:userId -> Get all todos for user
 */

import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validate } from '../middleware/validation';
import { createTodoValSchema, updateTodoValSchema, todoIdValSchema, userIdValSchema, todoFilterQuerySchema } from '../schemas/zod_index';

const todoApiRouter = Router();

// GET / - Get all todos with user data + optional filtering
todoApiRouter.get('/', validate(todoFilterQuerySchema), TodoController.getAllTodosWithUserData);

// POST / - Create new todo with user relation
todoApiRouter.post('/', validate(createTodoValSchema), TodoController.createNewTodoWithUser);

// GET /:id - Get specific todo with user data
todoApiRouter.get('/:id', validate(todoIdValSchema), TodoController.getSingleTodoWithUser);

// PUT /:id - Update existing todo
todoApiRouter.put('/:id', validate(todoIdValSchema.merge(updateTodoValSchema)), TodoController.updateExistingTodoWithUser);

// DELETE /:id - Delete todo by ID
todoApiRouter.delete('/:id', validate(todoIdValSchema), TodoController.deleteExistingTodoById);

// GET /user/:userId - Get all todos for specific user
todoApiRouter.get('/user/:userId', validate(userIdValSchema), TodoController.getTodosByUserWithUserData);

export default todoApiRouter;
