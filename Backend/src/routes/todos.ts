import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validate } from '../middleware/validation';
import { requireAuth } from '../middleware/auth';
import { createTodoValSchema, updateTodoValSchema, todoIdValSchema, todoFilterQuerySchema } from '../schemas/zod';

const router: Router = Router();

// All todo routes require authentication
router.use(requireAuth);

// GET / - Get all todos with user data + optional filtering
router.get('/', validate(todoFilterQuerySchema), TodoController.getAllTodosWithUserData);

// POST / - Create new todo with user relation
router.post('/', validate(createTodoValSchema), TodoController.createNewTodoWithUser);

// GET /:id - Get specific todo with user data //TODO evtl entfernen
router.get('/:id', validate(todoIdValSchema), TodoController.getSingleTodoWithUser);

// PUT /:id - Update existing todo
router.put('/:id', validate(todoIdValSchema.merge(updateTodoValSchema)), TodoController.updateExistingTodoWithUser);

// DELETE /:id - Delete todo by ID
router.delete('/:id', validate(todoIdValSchema), TodoController.deleteExistingTodoById);

export default router;
