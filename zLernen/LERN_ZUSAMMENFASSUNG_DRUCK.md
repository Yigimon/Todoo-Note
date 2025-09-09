# Backend-Entwicklung Lernzusammenfassung
**Node.js, Express.js, TypeScript, Prisma & PostgreSQL**

*Druckoptimierte Version*

---

## Inhaltsverzeichnis

1. [Was du gelernt hast](#was-du-gelernt-hast)
2. [Package Manager & Dependencies](#package-manager--dependencies)
3. [TypeScript Konfiguration](#typescript-konfiguration)
4. [Express.js Web-Framework](#expressjs-web-framework)
5. [Prisma ORM](#prisma-orm)
6. [Zod Validation](#zod-validation)
7. [Projekt-Architektur](#projekt-architektur)
8. [HTTP Methods & REST](#http-methods--rest)
9. [Error Handling](#error-handling)
10. [Wichtige Konzepte](#wichtige-konzepte)
11. [Zusammenfassung](#zusammenfassung)

---

## Was du gelernt hast

Dieses Backend-Projekt ist eine **vollständige Todo-Application** mit modernster Web-Technologie. Du hast nicht nur eine einfache API erstellt, sondern ein **professionelles, produktionsreifes Backend-System** entwickelt.

### Dein kompletter Technologie-Stack:

**Node.js** - JavaScript-Laufzeitumgebung für Server
**Express.js** - Minimalistisches Web-Framework
**TypeScript** - JavaScript mit statischen Typen
**PostgreSQL** - Fortschrittliche relationale Datenbank
**Prisma** - Modernes ORM mit Type-Safety
**Zod** - TypeScript-first Validierungsbibliothek
**pnpm** - Schneller Package Manager

---

## Package Manager & Dependencies

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
  "scripts": {
    "start": "node dist/index.js",     // Production
    "dev": "nodemon src/index.ts",     // Development
    "build": "tsc"                     // Kompilieren
  }
}
```

### Dependencies vs DevDependencies

**Dependencies (Production):**
- Essentiell für die laufende App
- Werden mit in die finale App gepackt
- Beispiel: express, @prisma/client, zod

**DevDependencies (Development):**
- Nur für die Entwicklung benötigt
- Nicht in der finalen App enthalten
- Beispiel: typescript, nodemon, @types/*

---

## TypeScript Konfiguration

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

### TypeScript Grundlagen

**Basis Types:**
```typescript
const name: string = "Max";
const age: number = 25;
const isActive: boolean = true;
const items: string[] = ["a", "b"];
```

**Interfaces:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;          // Optional
}
```

**Functions:**
```typescript
function createUser(name: string, email: string): User {
  return {
    id: "generated-id",
    name: name,
    email: email
  };
}
```

**Classes:**
```typescript
class TodoController {
  static async getAllTodos(): Promise<Todo[]> {
    return await database.findMany();
  }
}
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

---

## Express.js Web-Framework

### Was ist Express.js?

Express.js ist ein **minimales Web-Framework** für Node.js. Es macht es einfach, HTTP-Server zu erstellen und APIs zu bauen.

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
// GET Route
app.get('/api/users', (req, res) => {
  res.json({ message: "Alle Users" });
});

// POST Route
app.post('/api/users', (req, res) => {
  const userData = req.body;
  res.status(201).json({ message: "User erstellt" });
});

// PUT Route (Update)
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} aktualisiert` });
});
```

**Request & Response:**
```typescript
app.get('/api/todos', (req, res) => {
  const queryParams = req.query;      // ?search=test&limit=10
  const urlParams = req.params;       // /api/todos/:id
  const requestBody = req.body;       // JSON aus POST/PUT
  
  res.status(200);                    // Status Code
  res.json({ data: "todos" });        // JSON Response
});
```

### Middleware

Middleware sind **Funktionen** zwischen Request und Response:

```typescript
// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();  // Weiter zur nächsten Middleware
};

app.use(logger);  // Global anwenden

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

---

## Prisma ORM

### Was ist Prisma?

Prisma ist ein **Object-Relational Mapping (ORM)** Tool. Es übersetzt zwischen deinem TypeScript-Code und der PostgreSQL-Datenbank.

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

### Prisma Client Usage

**CREATE:**
```typescript
const newUser = await prisma.user.create({
  data: {
    email: "max@test.com",
    password: "hashedPassword",
    name: "Max"
  }
});
```

**READ:**
```typescript
// Einzelner Datensatz
const user = await prisma.user.findUnique({
  where: { id: "user-id" }
});

// Mehrere mit Filter
const activeUsers = await prisma.user.findMany({
  where: {
    email: { contains: "@gmail.com" }
  }
});
```

**UPDATE:**
```typescript
const updatedUser = await prisma.user.update({
  where: { id: "user-id" },
  data: { name: "Neuer Name" }
});
```

**DELETE:**
```typescript
await prisma.user.delete({
  where: { id: "user-id" }
});
```

**Mit Relationen:**
```typescript
const userWithTodos = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    todos: true  // Lade alle Todos mit
  }
});
```

---

## Zod Validation

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
        errors: result.error.errors
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

## Projekt-Architektur

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

---

## HTTP Methods & REST

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

**5xx Server Error:**
- 500 Internal Server Error - Server Fehler

---

## Error Handling

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
    message: 'Internal server error'
  });
});
```

---

## Wichtige Konzepte

### Async/Await

```typescript
// Richtig - Async/Await
async function fetchUserWithTodos(id: string): Promise<UserWithTodos> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  
  const todos = await prisma.todo.findMany({ where: { userId: id } });
  return { user, todos };
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
```

### Optional Chaining

```typescript
// Mit Optional Chaining
console.log(user?.profile?.address?.city);

// Mit Arrays
const firstTodo = user?.todos?.[0]?.title;
```

---

## Zusammenfassung

### Das hast du gemeistert:

✅ **Node.js & Express.js** - Web-Server Development
✅ **TypeScript** - Type-Safe Programming  
✅ **Prisma ORM** - Database Management
✅ **PostgreSQL** - Relational Database
✅ **Zod Validation** - Runtime Type Checking
✅ **RESTful API Design** - HTTP Methods & Status Codes
✅ **Error Handling** - Robust Application Development
✅ **Project Architecture** - Clean Code Organization
✅ **Modern JavaScript** - Async/Await, Destructuring, Spread

### Backend Development Workflow:

1. **Setup** - package.json, tsconfig.json, Dependencies
2. **Database** - Prisma Schema, Migrations
3. **Types** - TypeScript Interfaces und Types
4. **Validation** - Zod Schemas für Input-Validation
5. **Routes** - Express Router für API Endpoints
6. **Controllers** - Business Logic in Controller Classes
7. **Middleware** - Validation, Logging, Error Handling
8. **Utils** - Helper Functions für Database und Responses
9. **Testing** - API Endpoints testen

**Du bist jetzt bereit für professionelle Backend-Entwicklung! 🚀**
