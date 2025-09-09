import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validate } from '../middleware/validation';
import { createTodoValSchema, updateTodoValSchema, todoIdValSchema, todoFilterQuerySchema } from '../schemas/zod';

const router: Router = Router();

// GET / - Get all todos with user data + optional filtering
router.get('/', validate(todoFilterQuerySchema), TodoController.getAllTodosWithUserData);

// POST / - Create new todo with user relation
router.post('/', validate(createTodoValSchema), TodoController.createNewTodoWithUser);

// GET /:id - Get specific todo with user data
router.get('/:id', validate(todoIdValSchema), TodoController.getSingleTodoWithUser);

// PUT /:id - Update existing todo
router.put('/:id', validate(todoIdValSchema.merge(updateTodoValSchema)), TodoController.updateExistingTodoWithUser);

// DELETE /:id - Delete todo by ID
router.delete('/:id', validate(todoIdValSchema), TodoController.deleteExistingTodoById);

export default router;
