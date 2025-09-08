import { Status } from '@prisma/client';
import { z } from 'zod';


// User validation schemas
export const createUserValSchema = z.object({
  email: z.string().min(1, "Email is required").email('Invalid email format'),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein.")
  .max(32, "Passwort darf maximal 128 Zeichen haben.")
  .regex(/[A-Z]/, "mindestens 1 Großbuchstabe erforderlich")
  .regex(/[a-z]/, "mindestens 1 Kleinbuchstabe erforderlich")
  .regex(/\d/, "mindestens 1 Zahl erforderlich")
  .regex(/[^A-Za-z0-9]/, "mindestens 1 Sonderzeichen erforderlich")
  .regex(/^\S*$/, "kein Leerzeichen erlaubt"),
  name: z.string().optional(),
});

export const userLoginValSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Todo validation schemas
export const createTodoValSchema = z.object({
  title: z.string().min(1, 'Title is required').max(64, "Title is to long"),
  description: z.string().max(512, "Description is to long").optional(),
  expiresAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]).optional(), 
  reminder: z.string().datetime().optional(),
});

export const updateTodoValSchema = z.object({
  title: z.string().min(1, 'Title is required').max(64,"Title is to long").optional(),
  description: z.string().max(512, "Description is to long").optional(),
  status: z.nativeEnum(Status).optional(), 
  expiresAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  reminder: z.string().datetime().optional(),
});

export const todoIdValSchema = z.object({
  id: z.string().cuid('Invalid todo ID'),
});

export const userIdValSchema = z.object({
  userId: z.string().cuid('Invalid user ID'),
});

// Query Parameters für Todo Filtering
export const todoFilterQuerySchema = z.object({
  // Text-basierte Filter
  title: z.string().optional(),           // Suche nach Titel
  description: z.string().optional(),     // Suche in Beschreibung
  
  // Status Filter
  status: z.nativeEnum(Status).optional(), // Nur bestimmter Status
  
  // User Filter
  userId: z.string().cuid().optional(),   // Todos von bestimmtem User
  userName: z.string().optional(),        // Suche nach User-Name
  
  // Date Filter
  expiresAfter: z.string().datetime().optional(),   // Läuft nach Datum ab
  expiresBefore: z.string().datetime().optional(),  // Läuft vor Datum ab
  createdAfter: z.string().datetime().optional(),   // Erstellt nach Datum
  createdBefore: z.string().datetime().optional(),  // Erstellt vor Datum
  
  // Tag Filter
  tags: z.string().optional(),            // Komma-getrennte Tags: "work,urgent"
  hasTag: z.string().optional(),          // Hat bestimmten Tag
  
  // Sorting & Pagination
  sortBy: z.enum(['title', 'createdAt', 'expiresAt', 'status', 'userName']).default('createdAt').optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),     // Max Anzahl
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),    // Skip Anzahl
});

// Extracted input types from validation schemas
export type UserRegData = z.infer<typeof createUserValSchema>;
export type UserLoginCreds = z.infer<typeof userLoginValSchema>;
export type TodoCreateData = z.infer<typeof createTodoValSchema>;
export type TodoUpdateData = z.infer<typeof updateTodoValSchema>;
export type TodoIdParams = z.infer<typeof todoIdValSchema>;
export type UserIdParams = z.infer<typeof userIdValSchema>;
export type TodoFilterQuery = z.infer<typeof todoFilterQuerySchema>;
