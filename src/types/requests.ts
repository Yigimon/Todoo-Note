import { z } from 'zod';
import { 
  createUserValSchema, 
  userLoginValSchema, 
  createTodoValSchema, 
  updateTodoValSchema, 
  todoIdValSchema, 
  todoFilterQuerySchema 
} from '../schemas/zod';

// Request validation types extracted from Zod schemas
export type UserRegData = z.infer<typeof createUserValSchema>;
export type UserLoginCreds = z.infer<typeof userLoginValSchema>;
export type TodoCreateData = z.infer<typeof createTodoValSchema>;
export type TodoUpdateData = z.infer<typeof updateTodoValSchema>;
export type TodoIdParams = z.infer<typeof todoIdValSchema>;
export type TodoFilterQuery = z.infer<typeof todoFilterQuerySchema>;
