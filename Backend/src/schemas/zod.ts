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

// Erweiterte Query Parameters für Todo Filtering
export const todoFilterQuerySchema = z.object({
  // Text Filter
  title: z.string().optional(),                // Suche im Titel
  description: z.string().optional(),          // Suche in Beschreibung
  search: z.string().optional(),               // Suche in Titel UND Beschreibung
  
  // Status & User Filter
  status: z.nativeEnum(Status).optional(),     // Filter nach Status
  userId: z.string().cuid().optional(),        // Filter nach User
  
  // Datum Filter (ISO Format: yyyy-mm-dd)
  createdAt: z.string().date().optional(),            // Erstellt an diesem Tag
  expiresAt: z.string().date().optional(),            // Läuft an diesem Tag ab
  
  // Tag Filter
  hasTag: z.string().optional(),                      // Hat bestimmten Tag
  tags: z.string().optional(),                        // Komma-getrennte Tags: "work,urgent"
  
  // Sorting
  sortBy: z.enum(['createdAt', 'title', 'status', 'expiresAt']).default('createdAt').optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
});


