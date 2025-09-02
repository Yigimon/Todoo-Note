import { z } from 'zod';

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Todo schemas
export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  reminder: z.string().datetime().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['OPEN', 'COMPLETED']).optional(),
  expiresAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  reminder: z.string().datetime().optional(),
});

export const todoParamsSchema = z.object({
  id: z.string().cuid('Invalid todo ID'),
});

export const userParamsSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
});

// Types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoParams = z.infer<typeof todoParamsSchema>;
export type UserParams = z.infer<typeof userParamsSchema>;
