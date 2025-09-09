# Backend-Entwicklung Lernzusammenfassung
**Node.js, Express.js, TypeScript, Prisma & PostgreSQL**

## Inhaltsverzeichnis
1. [Was du gelernt hast](#1-was-du-gelernt-hast)
2. [Package Manager & Dependencies](#2-package-manager--dependencies)
3. [TypeScript Konfiguration](#3-typescript-konfiguration)
4. [Express.js Web-Framework](#4-expressjs-web-framework)
5. [Prisma ORM](#5-prisma-orm)
6. [Zod Validation](#6-zod-validation)
7. [Projekt-Architektur](#7-projekt-architektur)
8. [HTTP Methods & REST](#8-http-methods--rest)
9. [Environment Variables](#9-environment-variables)
10. [Error Handling](#10-error-handling)
11. [Wichtige Konzepte](#11-wichtige-konzepte)
12. [Promises & Error Handling](#12-promises--error-handling)
13. [Zusammenfassung](#13-zusammenfassung)

## 1. Was du gelernt hast

Dieses Backend-Projekt ist eine **vollständige Todo-Application** mit modernster Web-Technologie. Du hast ein **professionelles, produktionsreifes Backend-System** entwickelt.

### Dein kompletter Technologie-Stack:

**Node.js** - JavaScript-Laufzeitumgebung für Server-seitige Entwicklung. Event-driven und non-blocking für effiziente Anfragen-Verarbeitung.

**Express.js** - Minimalistisches Web-Framework für Node.js. Macht es einfach, HTTP-Server zu erstellen, Routen zu definieren und Middleware zu verwenden.

**TypeScript** - Erweiterte Version von JavaScript mit statischen Typen. Fehler werden bereits während der Entwicklung erkannt, nicht erst zur Laufzeit.

**PostgreSQL** - Fortschrittliche relationale Datenbank. Bekannt für Zuverlässigkeit, Datenintegrität und erweiterte Features.

**Prisma** - Modernes ORM Tool mit typsicherer Schnittstelle zur Datenbank. Generiert automatisch TypeScript-Types basierend auf dem Datenbankschema.

**Zod** - TypeScript-first Validierungsbibliothek. Validiert Daten zur Laufzeit und generiert automatisch TypeScript-Types für Schemas.

**pnpm** - Schneller und speicherschonender Package Manager als Alternative zu npm.

## 2. Package Manager & Dependencies

### Was ist ein Package Manager?
Ein Package Manager ist wie ein **automatischer Assistent**, der alle externen Bibliotheken verwaltet. **pnpm** bietet gegenüber npm mehrere Vorteile:
- **3-5x schnellere Installation** durch cleveres Caching
- **50-70% weniger Speicherverbrauch** durch Symlinks
- **Strengere Dependency-Verwaltung**

### package.json verstehen
Die package.json ist der **Ausweis deines Projekts**:

```json
{
  "name": "todoo-note-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

### Dependencies vs DevDependencies
**Dependencies (Production):** Essentiell für die laufende App, werden mit in die finale App gepackt. Beispiele: express, @prisma/client, zod, dotenv

**DevDependencies (Development):** Nur für die Entwicklung benötigt, nicht in der finalen App enthalten. Beispiele: typescript, nodemon, @types/express, ts-node

### Wichtige Commands
- **`pnpm run dev`** - Startet Development-Server mit automatischem Neuladen
- **`pnpm run build`** - Kompiliert TypeScript-Code zu JavaScript für Production
- **`pnpm start`** - Startet die fertige, kompilierte Version der App

## 3. TypeScript Konfiguration

### Warum TypeScript?
TypeScript ist **JavaScript mit Superkräften**. Es verhindert Fehler zur **Entwicklungszeit** statt zur **Laufzeit**.

**JavaScript Problem:**
```javascript
function addNumbers(a, b) {
    return a + b;
}
addNumbers(5, "hello"); // "5hello" - wahrscheinlich nicht gewollt!
```

**TypeScript Lösung:**
```typescript
function addNumbers(a: number, b: number): number {
    return a + b;
}
addNumbers(5, "hello"); // ERROR zur Compile-Zeit!
```

### Vorteile von TypeScript
1. **Frühe Fehlererkennung** - Bugs werden während der Entwicklung gefunden
2. **Bessere Code-Dokumentation** - Der Code dokumentiert sich selbst
3. **Autocompletion** - IDE kann intelligente Vorschläge machen
4. **Refactoring-Sicherheit** - Änderungen zeigen sofort betroffene Stellen
5. **Team-Zusammenarbeit** - Andere verstehen den Code schneller

### tsconfig.json Konfiguration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Wichtige Einstellungen erklärt:**
- `target: "ES2020"` - JavaScript-Version des kompilierten Codes
- `rootDir: "./src"` - Ordner mit TypeScript-Code
- `outDir: "./dist"` - Ordner für kompilierten JavaScript-Code
- `strict: true` - Strenge Type-Checks aktiviert

### TypeScript Grundlagen
**Basis Types:**
```typescript
const name: string = "Max";
const age: number = 25;
const isActive: boolean = true;
const items: string[] = ["a", "b"];
const optionalName?: string = undefined;
```

**Interfaces:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;  // Optional
}

const user: User = {
  id: "123",
  name: "Max",
  email: "max@test.com"
};
```

**Functions:**
```typescript
function createUser(name: string, email: string): User {
  return { id: "generated-id", name: name, email: email };
}
// Arrow Function
const getUser = (id: string): User | null => {
  return findUserById(id);
};
// Async Function
async function fetchData(): Promise<User[]> {
  const response = await fetch('/api/users');
  return response.json();
}
```

**Classes:**
```typescript
class TodoController {
  static async getAllTodos(): Promise<Todo[]> {
    return await database.findMany();
  }
}
// Verwendung
const todos = await TodoController.getAllTodos();
```

**Generics:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: "1", name: "Max", email: "max@test.com" }
};
```

**Enums:**
```typescript
enum Status {
  NEW = "NEW",
  OPEN = "OPEN",
  COMPLETED = "COMPLETED"
}
const todoStatus: Status = Status.OPEN;
```

**Utility Types:**
```typescript
// Partial - alle Properties optional
type PartialUser = Partial<User>;
// Pick - nur bestimmte Properties
type UserBasics = Pick<User, "name" | "email">;
// Omit - bestimmte Properties weglassen
type UserWithoutId = Omit<User, "id">;
```

## 4. Express.js Web-Framework

### Was ist Express.js?
Express.js ist ein **minimales Web-Framework** für Node.js. Es ermöglicht die Erstellung von HTTP-Servern und APIs mit wenig Code.

### Grundlegende Express Konzepte
**App Setup:**
```typescript
import express from 'express';
const app = express();
const port = 3000;
// Middleware für JSON Parsing
app.use(express.json());
// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
```

**Routes (Endpunkte):**
```typescript
// GET Route - Daten abrufen
app.get('/api/users', (req, res) => {
  res.json({ message: "Alle Users" });
});
// POST Route - Neue Daten erstellen
app.post('/api/users', (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: "User erstellt" });
});
// PUT Route - Daten aktualisieren
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} aktualisiert` });
});
// DELETE Route - Daten löschen
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} gelöscht` });
});
```

**Request & Response:**
```typescript
app.get('/api/todos', (req, res) => {
  // Request Object (req)
  const queryParams = req.query;      // ?search=test&limit=10
  const urlParams = req.params;       // /api/todos/:id
  const requestBody = req.body;       // JSON aus POST/PUT
  
  // Response Object (res)
  res.status(200);                    // Status Code
  res.json({ data: "todos" });        // JSON Response
});
```

**Router für Modularisierung:**
```typescript
// routes/todos.ts
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: "Alle Todos" });
});

router.post('/', (req, res) => {
  res.json({ message: "Todo erstellt" });
});

export default router;

// index.ts
import todoRouter from './routes/todos';
app.use('/api/todos', todoRouter);
```

### Middleware
Middleware sind **Funktionen** zwischen Request und Response:

```typescript
// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();  // Weiter zur nächsten Middleware
};
// Global anwenden
app.use(logger);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## 5. Prisma ORM

### Was ist Prisma?
Prisma ist ein **Object-Relational Mapping (ORM)** Tool. Es übersetzt zwischen TypeScript-Code und der PostgreSQL-Datenbank und bietet:

- **Automatische Type-Generierung** basierend auf dem Schema
- **IntelliSense/Autocompletion** für alle Datenbankoperationen
- **Typsichere Queries** zur Compile-Zeit
- **Migration-Management** für Schema-Änderungen

### Prisma Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  todos Todo[]
}

model Todo {
  id          String    @id @default(cuid())
  title       String
  description String?
  status      Status    @default(NEW)
  expiresAt   DateTime?
  tags        String[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  userId String
  user   User   @relation(fields: [userId], references: [id])
}

enum Status {
  NEW
  OPEN
  COMPLETED
}
```

**Schema-Elemente erklärt:**
**Generator** - Erstellt TypeScript-Client für die Datenbank
**Datasource** - Definiert Datenbanktyp und Verbindung
**Models** - Werden zu Datenbank-Tabellen
**Fields** - Werden zu Spalten in den Tabellen
**Relations** - Verbindungen zwischen Tabellen

### Prisma Field Types
```prisma
String      // Text
Int         // Ganze Zahl
Float       // Dezimalzahl
Boolean     // true/false
DateTime    // Datum + Zeit
Json        // JSON Object

// Modifiers
String?     // Optional (kann null sein)
String[]    // Array
@id         // Primary Key
@unique     // Eindeutig
@default()  // Default Wert
@updatedAt  // Auto-Update
```

### Prisma Client Usage
**CREATE - Daten erstellen:**
```typescript
const newUser = await prisma.user.create({
  data: {
    email: "max@test.com",
    password: "hashedPassword",
    name: "Max"
  }
});
```

**READ - Daten lesen:**
```typescript
// Einzelner Datensatz
const user = await prisma.user.findUnique({
  where: { id: "user-id" }
});
// Mehrere Datensätze
const allUsers = await prisma.user.findMany();
// Mit Filtern
const activeUsers = await prisma.user.findMany({
  where: {
    email: { contains: "@gmail.com" }
  }
});
```

**UPDATE - Daten aktualisieren:**
```typescript
const updatedUser = await prisma.user.update({
  where: { id: "user-id" },
  data: { name: "Neuer Name" }
});
```

**DELETE - Daten löschen:**
```typescript
await prisma.user.delete({
  where: { id: "user-id" }
});
```

**Mit Relationen (JOIN):**
```typescript
const userWithTodos = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    todos: true  // Lade alle Todos mit
  }
});
```

### Prisma Migrations
```bash
# Neue Migration nach Schema-Änderung
npx prisma migrate dev --name add-tags-field
# Prisma Client neu generieren
npx prisma generate
# Prisma Studio (Datenbank GUI)
npx prisma studio
```

---

## 6. Zod Validation

### Was ist Zod?

Zod ist eine **TypeScript-first Schema Validation Library**. Es validiert Daten zur **Laufzeit** und generiert **Types** zur **Compile-Zeit**.

### Grundlegende Zod Schemas

```typescript
import { z } from 'zod';

// Basis Validierungen
const emailSchema = z.string()
  .min(1, "Email ist erforderlich")
  .max(100, "Email zu lang")
  .email("Ungültige Email");

const ageSchema = z.number()
  .min(0, "Alter muss positiv sein")
  .max(120, "Unrealistisches Alter")
  .int("Alter muss ganze Zahl sein");

// Objects
const userSchema = z.object({
  id: z.string().cuid("Ungültige ID"),
  email: z.string().email(),
  name: z.string().optional(),
  age: z.number().min(0).max(120)
});

// Arrays
const tagsSchema = z.array(z.string());

// Enums
const statusSchema = z.enum(["NEW", "OPEN", "COMPLETED"]);
```

### Advanced Zod Features

```typescript
// Union Types (mehrere mögliche Typen)
const idSchema = z.union([z.string(), z.number()]);

// Conditional Validation
const userSchema = z.object({
  type: z.enum(["ADMIN", "USER"]),
  permissions: z.array(z.string()).optional()
}).refine(data => {
  // Admins müssen Permissions haben
  if (data.type === "ADMIN") {
    return data.permissions && data.permissions.length > 0;
  }
  return true;
}, "Admin braucht Permissions");

// Transform (Daten umwandeln)
const dateSchema = z.string().transform(str => new Date(str));

// Default Values
const configSchema = z.object({
  debug: z.boolean().default(false),
  port: z.number().default(3000)
});
```

### Zod in Express Middleware

```typescript
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      ...req.body,
      ...req.params,
      ...req.query
    });
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    
    next();
  };
};

// Verwendung
router.post('/', validate(createTodoSchema), TodoController.createTodo);
```

### Type Inference

```typescript
// Schema definieren
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional()
});

// Type aus Schema generieren
type User = z.infer<typeof userSchema>;
// = { id: string; email: string; name?: string }
```

---

## 7. Projekt-Architektur

### MVC Pattern

Dein Projekt verwendet eine **modifizierte MVC-Architektur**:

```
src/
├── controllers/    -> Business Logic
├── routes/         -> API Endpoints
├── middleware/     -> Request Processing
├── utils/          -> Helper Functions
├── types/          -> TypeScript Definitions
└── schemas/        -> Validation Schemas
```

### Controller Pattern

```typescript
export class TodoController {
  static async getAllTodos(req: Request, res: Response) {
    try {
      // 1. Input validieren
      const filters = req.query as TodoFilterQuery;
      
      // 2. Database Query
      const todos = await prisma.todo.findMany({
        where: UserSelectHelper.buildTodoFilter(filters)
      });
      
      // 3. Response senden
      ResponseHelper.send200(res, todos);
    } catch (error) {
      // 4. Error Handling
      ResponseHelper.send500(res, 'Could not fetch todos', error);
    }
  }
}
```

### Helper Pattern

```typescript
export class UserSelectHelper {
  static buildTodoFilter(filters: TodoFilterQuery) {
    const whereClause: Prisma.TodoWhereInput = {};
    
    if (filters.status) {
      whereClause.status = filters.status;
    }
    
    if (filters.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }
    
    return whereClause;
  }
}
```

### Response Helper Pattern

```typescript
export class ResponseHelper {
  static sendResponse<T>(
    res: Response, 
    status: number, 
    data?: T, 
    message?: string
  ): void {
    const response = {
      success: status < 400,
      ...(data && { data }),
      ...(Array.isArray(data) && { count: data.length }),
      ...(message && { message })
    };
    
    res.status(status).json(response);
  }

  static send200<T>(res: Response, data: T, message?: string): void {
    this.sendResponse(res, 200, data, message);
  }
  
  static send404(res: Response, message: string): void {
    this.sendResponse(res, 404, null, message);
  }
  
  static send500(res: Response, message: string, error?: unknown): void {
    console.error('Error:', error);
    this.sendResponse(res, 500, null, message);
  }
}
```

---

## 8. HTTP Methods & REST

### REST Prinzipien

- **Resource-based URLs** (/api/todos nicht /api/getTodos)
- **HTTP Methods** für verschiedene Aktionen
- **Stateless** (jeder Request ist unabhängig)
- **Konsistente Response-Struktur**

### HTTP Methods

```typescript
// GET - Daten abrufen (READ)
router.get('/api/todos', TodoController.getAllTodos);
router.get('/api/todos/:id', TodoController.getSingleTodo);

// POST - Neue Daten erstellen (CREATE)
router.post('/api/todos', TodoController.createTodo);

// PUT - Daten komplett ersetzen (UPDATE)
router.put('/api/todos/:id', TodoController.updateTodo);

// DELETE - Daten löschen (DELETE)
router.delete('/api/todos/:id', TodoController.deleteTodo);
```

### Status Codes

**2xx Success:**
- 200 OK - Erfolgreich
- 201 Created - Erstellt
- 204 No Content - Erfolgreich, kein Inhalt

**4xx Client Error:**
- 400 Bad Request - Ungültige Anfrage
- 401 Unauthorized - Nicht angemeldet
- 404 Not Found - Nicht gefunden
- 422 Unprocessable Entity - Validation Error

**5xx Server Error:**
- 500 Internal Server Error - Server Fehler
- 503 Service Unavailable - Service nicht verfügbar

### Query Parameters

```typescript
// /api/todos?status=OPEN&sortBy=title&sortOrder=asc
app.get('/api/todos', (req, res) => {
  const { status, sortBy, sortOrder, search } = req.query;
  
  const filter: any = {};
  if (status) filter.status = status;
  if (search) filter.OR = [
    { title: { contains: search } },
    { description: { contains: search } }
  ];
  
  const orderBy = { [sortBy || 'createdAt']: sortOrder || 'desc' };
});
```

---

## 9. Environment Variables

### .env File

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/todoo_db"

# Server
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-key
BCRYPT_ROUNDS=12
```

### dotenv Usage

```typescript
import dotenv from 'dotenv';

// .env File laden
dotenv.config();

// Environment Variables verwenden
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

// Validation
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}
```

---

## 10. Error Handling

### Try-Catch Pattern

```typescript
static async createTodo(req: Request, res: Response) {
  try {
    // Happy Path
    const todoData = req.body;
    const newTodo = await prisma.todo.create({ data: todoData });
    ResponseHelper.send200(res, newTodo, 201, 'Todo created');
  } catch (error) {
    // Error Path
    console.error('Create Todo Error:', error);
    
    if (error.code === 'P2002') {  // Prisma Unique Constraint
      return ResponseHelper.send400(res, 'Todo already exists');
    }
    
    ResponseHelper.send500(res, 'Could not create todo', error);
  }
}
```

### Error Middleware

```typescript
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error(`Route: ${req.method} ${req.path}`);
  console.error(`Message: ${error.message}`);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: error.message 
    })
  });
});
```

---

## 11. Wichtige Konzepte

### Async/Await

```typescript
// Richtig - Async/Await
async function fetchUserWithTodos(id: string): Promise<UserWithTodos> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  
  const todos = await prisma.todo.findMany({ where: { userId: id } });
  return { user, todos };
}

// Verwendung
try {
  const userWithTodos = await fetchUserWithTodos('123');
  console.log(userWithTodos);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Destructuring

```typescript
// Object Destructuring
const { name, email } = user;

// Array Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Function Parameter
function createUser({ name, email }: { name: string; email: string }) {
  return { id: generateId(), name, email };
}
```

### Spread Operator

```typescript
// Object Spread
const userWithEmail = { ...user, email: 'max@test.com' };

// Array Spread
const moreNumbers = [...numbers, 4, 5];

// Function Arguments
const nums = [1, 2, 3];
sum(...nums);  // Equivalent zu sum(1, 2, 3)
```

### Optional Chaining

```typescript
// Mit Optional Chaining
console.log(user?.profile?.address?.city);

// Mit Arrays
const firstTodo = user?.todos?.[0]?.title;

// Mit Function Calls
user?.calculateScore?.();
```

### Nullish Coalescing

```typescript
// Mit ?? (nur bei null/undefined)
const port = process.env.PORT ?? 3000;

// Kombination mit Optional Chaining
const userCity = user?.profile?.address?.city ?? 'Unknown City';
```

---

## 12. Promises & Error Handling

### Promise Basics

```typescript
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve('Data loaded successfully');
      } else {
        reject(new Error('Failed to load data'));
      }
    }, 1000);
  });
};

// Promise verwenden
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('Request completed'));
```

### Async/Await Error Handling

```typescript
async function loadUser(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error('Failed to load user:', error);
    return null;
  }
}

// Multiple Operations mit Transaction
async function createUserWithTodo(userData: UserData): Promise<UserWithTodos> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userData });
      const todo = await tx.todo.create({
        data: {
          title: 'Welcome Todo',
          userId: user.id
        }
      });
      return { user, todo };
    });
    
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error('Could not create user with todo');
  }
}
```

---

## 13. Zusammenfassung

### Backend Development Workflow

1. **Setup** - package.json, tsconfig.json, Dependencies
2. **Database** - Prisma Schema definieren, Migrations
3. **Types** - TypeScript Interfaces und Types definieren
4. **Validation** - Zod Schemas für Input-Validation
5. **Routes** - Express Router für API Endpoints
6. **Controllers** - Business Logic in Controller Classes
7. **Middleware** - Validation, Logging, Error Handling
8. **Utils** - Helper Functions für Database und Responses
9. **Testing** - API Endpoints testen

### Key Patterns

- **MVC Architecture** - Separation of Concerns
- **Type Safety** - TypeScript für Compile-Time Errors
- **Validation** - Runtime Validation mit Zod
- **Error Handling** - Try-Catch mit spezifischen Error Types
- **Helper Classes** - Static Methods für wiederverwendbare Logik
- **Response Standardization** - Einheitliche API Responses

### Production Readiness

- Environment Variables für Configuration
- Proper Error Logging
- Input Validation auf allen Endpoints
- Database Transactions für Data Integrity
- TypeScript für Type Safety
- Modular Code Structure

### Das hast du gemeistert:

- **Node.js & Express.js** - Web-Server Development
- **TypeScript** - Type-Safe Programming
- **Prisma ORM** - Database Management
- **PostgreSQL** - Relational Database
- **Zod Validation** - Runtime Type Checking
- **RESTful API Design** - HTTP Methods & Status Codes
- **Error Handling** - Robust Application Development
- **Project Architecture** - Clean Code Organization
- **Modern JavaScript** - Async/Await, Destructuring, Spread

**Du bist jetzt bereit für professionelle Backend-Entwicklung!**
