# 📚 Backend-Entwicklung Lernzusammenfassung
## Node.js, Express.js, TypeScript, Prisma & PostgreSQL

---

## 🎯 **Was du in diesem Projekt gelernt hast**

Dieses Backend-Projekt ist eine **vollständige Todo-Application** mit modernster Web-Technologie. Du hast nicht nur eine einfache API erstellt, sondern ein **professionelles, produktionsreifes Backend-System** entwickelt. Dabei hast du gelernt, wie man eine **RESTful API** von Grund auf aufbaut, die mit einer **PostgreSQL-Datenbank** kommuniziert und dabei **typsichere Validierung** sowie **moderne JavaScript-Features** verwendet.

Das Besondere an diesem Projekt ist, dass es alle wichtigen Aspekte der modernen Backend-Entwicklung abdeckt: Von der **Projektstruktur** über **Datenbankdesign** bis hin zu **Error Handling** und **Code-Organisation**. Du hast dabei nicht nur einzelne Technologien gelernt, sondern verstanden, wie sie **zusammenarbeiten** und sich **ergänzen**.

### **Dein kompletter Technologie-Stack:**

**Runtime Environment:**
- **Node.js** - Die JavaScript-Laufzeitumgebung, die es ermöglicht, JavaScript auf dem Server auszuführen. Node.js ist event-driven und non-blocking, was bedeutet, dass es sehr effizient mit vielen gleichzeitigen Anfragen umgehen kann.

**Web-Framework:**
- **Express.js** - Das minimalistische, aber mächtige Web-Framework für Node.js. Express.js macht es einfach, HTTP-Server zu erstellen, Routen zu definieren und Middleware zu verwenden.

**Programmiersprache:**
- **TypeScript** - Eine erweiterte Version von JavaScript, die statische Typen hinzufügt. Dies bedeutet, dass Fehler bereits während der Entwicklung erkannt werden, nicht erst zur Laufzeit.

**Datenbank-System:**
- **PostgreSQL** - Eine der fortschrittlichsten relationalen Datenbanken. PostgreSQL ist bekannt für seine Zuverlässigkeit, Datenintegrität und erweiterte Features wie JSON-Support.

**Object-Relational Mapping:**
- **Prisma** - Ein modernes ORM (Object-Relational Mapping) Tool, das eine typsichere Schnittstelle zur Datenbank bietet. Prisma generiert automatisch TypeScript-Types basierend auf deinem Datenbankschema.

**Validierung:**
- **Zod** - Eine TypeScript-first Validierungsbibliothek. Zod validiert nicht nur Daten zur Laufzeit, sondern generiert auch automatisch TypeScript-Types für deine Schemas.

**Package Manager:**
- **pnpm** - Ein schneller und speicherschonender Package Manager, der eine Alternative zu npm darstellt und besonders bei großen Projekten Vorteile bietet.

---

## 📦 **1. Package Manager & Dependencies verstehen**

### **Was ist ein Package Manager und warum brauchst du pnpm?**

Ein Package Manager ist wie ein **automatischer Assistent**, der sich um alle externen Bibliotheken (Dependencies) kümmert, die dein Projekt benötigt. Stell dir vor, du willst eine Website bauen und brauchst verschiedene Werkzeuge - anstatt jedes Werkzeug einzeln herunterzuladen und zu installieren, macht das der Package Manager für dich.

**pnpm** ist eine **moderne Alternative zu npm** und bietet mehrere Vorteile:
- **Schnellere Installation** durch cleveres Caching
- **Weniger Speicherverbrauch** durch Symlinks
- **Strengere Dependency-Verwaltung** (verhindert versehentlichen Zugriff auf nicht deklarierte Dependencies)

In großen Projekten kann pnpm **3-5x schneller** sein als npm und dabei **50-70% weniger Speicherplatz** verbrauchen.

### **package.json - Das Herzstück deines Projekts verstehen**

Die `package.json` ist wie der **Ausweis deines Projekts**. Sie enthält alle wichtigen Informationen: Name, Version, Abhängigkeiten und Befehle. Lass uns jeden Teil im Detail verstehen:
```json
{
  "name": "todoo-note-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/index.js",     // Production Start
    "dev": "nodemon src/index.ts",     // Development mit Auto-Reload
    "build": "tsc",                    // TypeScript kompilieren
    "prisma:generate": "prisma generate",  // Prisma Client generieren
    "prisma:migrate": "prisma migrate dev" // Database Schema ändern
  }
}
```

### **Dependencies vs DevDependencies - Der wichtige Unterschied**

Hier ist ein **fundamentales Konzept**, das viele Entwickler anfangs verwirrt: Der Unterschied zwischen `dependencies` und `devDependencies`. Stell dir vor, du baust ein Auto:

**Dependencies (Production Dependencies):**
- Das sind die **essentiellen Teile**, die das Auto zum Fahren braucht: Motor, Räder, Lenkung
- Diese werden **mit in die finale Anwendung** gepackt
- **Ohne sie läuft deine App nicht**

**DevDependencies (Development Dependencies):**
- Das sind die **Werkzeuge**, die du zum Bauen des Autos brauchst: Schraubenschlüssel, Schweißgerät, Teststand
- Diese werden **nur während der Entwicklung** gebraucht
- **In der finalen App sind sie nicht enthalten**
```json
{
  "dependencies": {
    // 🟢 PRODUCTION Dependencies (werden in der Live-App gebraucht)
    "express": "^4.18.2",          // Web-Server Framework
    "@prisma/client": "^5.7.0",    // Datenbank Client
    "zod": "^3.22.4",               // Schema Validierung
    "dotenv": "^16.3.1"             // Environment Variables
  },
  "devDependencies": {
    // 🔧 DEVELOPMENT Dependencies (nur für Entwicklung)
    "typescript": "^5.3.2",        // TypeScript Compiler
    "nodemon": "^3.0.2",           // Auto-Restart bei Änderungen
    "@types/express": "^4.17.21",  // TypeScript Types für Express
    "ts-node": "^10.9.1"           // TypeScript direkt ausführen
  }
}
```

### **Warum werden Scripts in package.json definiert?**

Scripts sind **vordefinierte Befehle**, die komplexe Terminal-Kommandos vereinfachen. Anstatt jedes Mal `./node_modules/.bin/nodemon src/index.ts` zu tippen, kannst du einfach `pnpm dev` schreiben. Das ist nicht nur **bequemer**, sondern auch:

- **Konsistent** - Alle Entwickler verwenden die gleichen Befehle
- **Dokumentiert** - Neue Teammitglieder sehen sofort, welche Befehle verfügbar sind
- **Plattformunabhängig** - Funktioniert auf Windows, Mac und Linux gleich

### **Die wichtigsten Commands in deinem Projekt erklärt:**

**`pnpm run dev`** - Startet den Development-Server mit **automatischem Neuladen**. Jedes Mal, wenn du eine Datei änderst, startet der Server automatisch neu. Das spart dir hunderte von manuellen Neustarts während der Entwicklung.

**`pnpm run build`** - Kompiliert dein TypeScript-Code zu JavaScript und erstellt alle nötigen Dateien für Production. Der kompilierte Code ist **optimiert** und **bereit für den Live-Einsatz**.

**`pnpm start`** - Startet die **fertige, kompilierte Version** deiner App. Das ist der Befehl, der auf dem Production-Server verwendet wird.

### **Wichtige Befehle:**
```bash
# Alle Dependencies installieren
pnpm install

# Projekt in Development Mode starten (mit Auto-Reload)
pnpm run dev

# Projekt für Production kompilieren
pnpm run build

# Production Version starten
pnpm start
```

---

## ⚙️ **2. TypeScript Konfiguration verstehen**

### **Was ist TypeScript und warum ist es so revolutionär?**

TypeScript ist **JavaScript mit Superkräften**. Stell dir vor, du schreibst einen Brief, aber anstatt erst beim Versenden zu merken, dass du Rechtschreibfehler gemacht hast, korrigiert dich jemand **während des Schreibens**. Genau das macht TypeScript für deine Code.

**Das Problem mit reinem JavaScript:**
```javascript
// JavaScript - Fehler wird erst zur Laufzeit erkannt
function addNumbers(a, b) {
    return a + b;
}

addNumbers(5, "hello"); // Gibt "5hello" zurück - wahrscheinlich nicht gewollt!
```

**Die TypeScript-Lösung:**
```typescript
// TypeScript - Fehler wird sofort angezeigt
function addNumbers(a: number, b: number): number {
    return a + b;
}

addNumbers(5, "hello"); // ❌ ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
```

### **Warum TypeScript in professionellen Projekten unverzichtbar ist:**

**1. Frühe Fehlererkennung:** Bugs werden **während der Entwicklung** gefunden, nicht von deinen Benutzern.

**2. Bessere Code-Dokumentation:** Der Code dokumentiert sich selbst durch Types.

**3. Autocompletion:** Deine IDE kann dir **intelligente Vorschläge** machen.

**4. Refactoring-Sicherheit:** Wenn du etwas änderst, siehst du sofort alle betroffenen Stellen.

**5. Team-Zusammenarbeit:** Andere Entwickler verstehen deinen Code schneller.

### **tsconfig.json - Die Schaltzentrale deines TypeScript-Projekts**

Die `tsconfig.json` ist wie das **Einstellungsmenü** für den TypeScript-Compiler. Jede Option beeinflusst, wie dein Code kompiliert wird. Lass uns die wichtigsten Einstellungen verstehen:

**`target: "ES2020"`** - Das ist die **JavaScript-Version**, die am Ende herauskommt. ES2020 bedeutet, dass moderne JavaScript-Features verwendet werden können.

**`module: "commonjs"`** - Das definiert, wie **Module importiert/exportiert** werden. CommonJS ist der Standard für Node.js.

**`rootDir: "./src"`** - Das ist der **Ordner mit deinem TypeScript-Code**. Alle .ts-Dateien sollten hier drin sein.

**`outDir: "./dist"`** - Hier landet der **kompilierte JavaScript-Code**. Dieser Ordner wird automatisch erstellt.

**`strict: true`** - Das ist der **"Hardcore-Modus"** von TypeScript. Alle Type-Checks sind maximal streng. Das ist gut für die Code-Qualität!
```json
{
  "compilerOptions": {
    "target": "ES2020",                    // JavaScript Version
    "module": "commonjs",                  // Module System
    "rootDir": "./src",                    // Source Code Ordner
    "outDir": "./dist",                    // Kompilierte Dateien
    "strict": true,                        // Strenge Type-Prüfung
    "esModuleInterop": true,              // Module Import Kompatibilität
    "skipLibCheck": true,                 // Library Type-Check überspringen
    "declaration": true,                  // .d.ts Dateien generieren
    "sourceMap": true                     // Source Maps für Debugging
  },
  "include": ["src/**/*"],                // Welche Dateien kompilieren
  "exclude": ["node_modules", "dist"]     // Welche Dateien ignorieren
}
```

### **Grundlegende TypeScript Syntax:**

#### **1. Variablen und Types**
```typescript
// Basis Types
const name: string = "Max";              // Text
const age: number = 25;                  // Zahl
const isActive: boolean = true;          // true/false
const data: null = null;                 // Null
const items: string[] = ["a", "b"];      // Array von Strings

// Optional Properties (können undefined sein)
const optionalName?: string = undefined;

// Union Types (mehrere mögliche Types)
const id: string | number = "123";
```

#### **2. Objects und Interfaces**
```typescript
// Interface Definition (beschreibt Objekt-Struktur)
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;          // Optional
}

// Object mit Interface
const user: User = {
  id: "123",
  name: "Max",
  email: "max@test.com"
  // age ist optional
};
```

#### **3. Functions**
```typescript
// Function mit Types
function createUser(name: string, email: string): User {
  return {
    id: "generated-id",
    name: name,
    email: email
  };
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

#### **4. Classes**
```typescript
class TodoController {
  // Static Method (wird an der Klasse aufgerufen, nicht an Instanz)
  static async getAllTodos(): Promise<Todo[]> {
    return await database.findMany();
  }
}

// Verwendung
const todos = await TodoController.getAllTodos();
```

#### **5. Generics (Universal Types)**
```typescript
// Generic Interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Verwendung mit verschiedenen Types
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: "1", name: "Max", email: "max@test.com" }
};

const todosResponse: ApiResponse<Todo[]> = {
  success: true,
  data: [{ id: "1", title: "Learn TypeScript" }]
};
```

#### **6. Enums**
```typescript
// Enum für vordefinierte Werte
enum Status {
  NEW = "NEW",
  OPEN = "OPEN", 
  COMPLETED = "COMPLETED"
}

// Verwendung
const todoStatus: Status = Status.OPEN;
```

#### **7. Type Aliases**
```typescript
// Type Alias erstellen
type TodoStatus = "NEW" | "OPEN" | "COMPLETED";
type UserRole = "ADMIN" | "USER" | "GUEST";

// Verwendung
const status: TodoStatus = "OPEN";
```

#### **8. Utility Types**
```typescript
// Partial (alle Properties optional)
type PartialUser = Partial<User>;
// = { id?: string; name?: string; email?: string; }

// Pick (nur bestimmte Properties)
type UserBasics = Pick<User, "name" | "email">;
// = { name: string; email: string; }

// Omit (bestimmte Properties weglassen)
type UserWithoutId = Omit<User, "id">;
// = { name: string; email: string; }
```

---

## 🌐 **3. Express.js - Web-Server Framework**

### **Was ist Express.js?**
Express.js ist ein **minimales Web-Framework** für Node.js. Es ermöglicht die Erstellung von **APIs** und **Web-Servern**.

### **Grundlegende Express-Konzepte:**

#### **1. App Setup**
```typescript
import express from 'express';

// Express App erstellen
const app = express();
const port = 3000;

// Middleware für JSON Parsing
app.use(express.json());

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
```

#### **2. Routes (Endpunkte)**
```typescript
// GET Route
app.get('/api/users', (req, res) => {
  res.json({ message: "Alle Users" });
});

// POST Route  
app.post('/api/users', (req, res) => {
  const userData = req.body;  // Request Body
  res.status(201).json({ message: "User erstellt", data: userData });
});

// PUT Route (Update)
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;  // URL Parameter
  const updateData = req.body;   // Request Body
  res.json({ message: `User ${userId} aktualisiert` });
});

// DELETE Route
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ${userId} gelöscht` });
});
```

#### **3. Request & Response Objects**
```typescript
app.get('/api/todos', (req, res) => {
  // Request Object (req)
  const queryParams = req.query;      // ?search=test&limit=10
  const urlParams = req.params;       // /api/todos/:id
  const requestBody = req.body;       // JSON aus POST/PUT
  const headers = req.headers;        // HTTP Headers
  
  // Response Object (res)
  res.status(200);                    // Status Code setzen
  res.json({ data: "todos" });        // JSON Response
  res.send("Plain text");             // Text Response
});
```

#### **4. Router (Modularisierung)**
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
app.use('/api/todos', todoRouter);  // Alle Routes unter /api/todos
```

#### **5. Middleware**
Middleware sind **Funktionen**, die zwischen **Request** und **Response** ausgeführt werden.

```typescript
// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();  // Weiter zur nächsten Middleware/Route
};

// Middleware global anwenden
app.use(logger);

// Middleware für bestimmte Route
app.get('/api/todos', logger, (req, res) => {
  res.json({ todos: [] });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

---

## 🗃️ **4. Prisma ORM - Datenbank Management**

### **Was ist Prisma und warum revolutioniert es die Datenbankarbeit?**

Prisma ist ein **Object-Relational Mapping (ORM)** Tool, aber das erklärt noch nicht, warum es so besonders ist. Stell dir vor, du musst mit jemandem sprechen, der eine andere Sprache spricht. Du brauchst einen **Übersetzer**. Genau das macht Prisma zwischen deinem TypeScript-Code und der PostgreSQL-Datenbank.

**Das Problem ohne ORM:**
Du müsstest **rohe SQL-Queries** schreiben, die:
- **Fehleranfällig** sind (Typos in Tabellennamen)
- **Nicht typsicher** sind (TypeScript kann sie nicht prüfen)
- **Schwer zu maintainen** sind (Änderungen am Schema erfordern Änderungen überall)

**Die Prisma-Lösung:**
- **Automatische Type-Generierung** basierend auf deinem Schema
- **IntelliSense/Autocompletion** für alle Datenbankoperationen
- **Typsichere Queries** zur Compile-Zeit
- **Migration-Management** für Schema-Änderungen

### **Prisma Schema (schema.prisma) - Dein Datenbankmodell**
```prisma
// Generator - erstellt TypeScript Client
generator client {
  provider = "prisma-client-js"
}

// Datasource - Datenbankverbindung
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Models - Datenbank Tabellen
model User {
  id        String   @id @default(cuid())    // Primary Key
  email     String   @unique                 // Unique Constraint
  password  String
  name      String?                          // Optional Field
  createdAt DateTime @default(now())         // Default Value
  updatedAt DateTime @updatedAt              // Auto-update

  // Relation zu Todo
  todos Todo[]
}

model Todo {
  id          String    @id @default(cuid())
  title       String
  description String?
  status      Status    @default(NEW)        // Enum Default
  expiresAt   DateTime?
  tags        String[]                       // Array Field
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Foreign Key Relation
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Enum Definition
enum Status {
  NEW
  OPEN
  COMPLETED
}
```

### **Jedes Element im Detail erklärt:**

**Generator-Block:**
```prisma
generator client {
  provider = "prisma-client-js"
}
```
Das sagt Prisma: "Erstelle mir einen **TypeScript-Client**, den ich in meinem Code verwenden kann." Dieser Client wird automatisch generiert und enthält alle typsicheren Methoden für deine Datenbank.

**Datasource-Block:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Das definiert **welche Datenbank** du verwendest (PostgreSQL) und **wo sie zu finden ist** (über die Environment-Variable DATABASE_URL).

**Model-Definitionen:**
Jedes `model` wird zu einer **Datenbank-Tabelle**. Die Felder im Model werden zu **Spalten** in der Tabelle.

### **Prisma Field Types:**
```prisma
// Basis Types
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

### **Prisma Client Usage:**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE - Neuen Datensatz erstellen
const newUser = await prisma.user.create({
  data: {
    email: "max@test.com",
    password: "hashedPassword",
    name: "Max"
  }
});

// READ - Daten lesen
// Einzelner Datensatz
const user = await prisma.user.findUnique({
  where: { id: "user-id" }
});

// Mehrere Datensätze
const allUsers = await prisma.user.findMany();

// Mit Filtern
const activeUsers = await prisma.user.findMany({
  where: {
    email: { contains: "@gmail.com" },
    name: { not: null }
  }
});

// UPDATE - Datensatz aktualisieren
const updatedUser = await prisma.user.update({
  where: { id: "user-id" },
  data: { name: "Neuer Name" }
});

// DELETE - Datensatz löschen
await prisma.user.delete({
  where: { id: "user-id" }
});

// Mit Relationen (JOIN)
const userWithTodos = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    todos: true  // Lade alle Todos mit
  }
});
```

### **Prisma Migrations:**
```bash
# Neue Migration erstellen (nach Schema-Änderung)
npx prisma migrate dev --name add-tags-field

# Prisma Client neu generieren (nach Schema-Änderung)
npx prisma generate

# Datenbank zurücksetzen (VORSICHT!)
npx prisma migrate reset

# Prisma Studio (Datenbank GUI)
npx prisma studio
```

---

## ✅ **5. Zod Validation - Schema Validierung**

### **Was ist Zod?**
Zod ist eine **TypeScript-first Schema Validation Library**. Es validiert Daten zur **Laufzeit** und generiert **Types** zur **Compile-Zeit**.

### **Grundlegende Zod Schemas:**
```typescript
import { z } from 'zod';

// Basis Validierungen
const stringSchema = z.string();                    // Muss String sein
const numberSchema = z.number();                    // Muss Number sein
const booleanSchema = z.boolean();                  // Muss Boolean sein

// String Validierungen
const emailSchema = z.string()
  .min(1, "Email ist erforderlich")                 // Mindestlänge
  .max(100, "Email zu lang")                        // Maximallänge
  .email("Ungültige Email");                        // Email Format

// Number Validierungen
const ageSchema = z.number()
  .min(0, "Alter muss positiv sein")                // Mindestwert
  .max(120, "Unrealistisches Alter")               // Maximalwert
  .int("Alter muss ganze Zahl sein");              // Nur ganze Zahlen

// Optional Fields
const optionalName = z.string().optional();        // Kann undefined sein
const nullableName = z.string().nullable();        // Kann null sein

// Arrays
const tagsSchema = z.array(z.string());            // Array von Strings
const numbersSchema = z.array(z.number().min(0)); // Array von positiven Zahlen

// Objects
const userSchema = z.object({
  id: z.string().cuid("Ungültige ID"),              // Custom Error Message
  email: z.string().email(),
  name: z.string().optional(),
  age: z.number().min(0).max(120)
});

// Enums
const statusSchema = z.enum(["NEW", "OPEN", "COMPLETED"]);
// Oder mit Prisma Enum
const statusSchema2 = z.nativeEnum(Status);        // Aus Prisma importiert
```

### **Advanced Zod Features:**
```typescript
// Union Types (oder)
const idSchema = z.union([z.string(), z.number()]);

// Literal Values
const roleSchema = z.literal("ADMIN").or(z.literal("USER"));

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

### **Zod in Express Middleware:**
```typescript
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Validation Middleware
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validiere Body, Params und Query
    const result = schema.safeParse({
      ...req.body,    // POST/PUT Data
      ...req.params,  // URL Parameter (:id)
      ...req.query    // Query Parameter (?search=test)
    });
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.errors.map(err => ({
          field: err.path.join('.'),  // Welches Feld
          message: err.message        // Error Message
        }))
      });
    }
    
    next();  // Validation erfolgreich
  };
};

// Schema definieren
const createTodoSchema = z.object({
  title: z.string().min(1, "Titel erforderlich").max(64, "Titel zu lang"),
  description: z.string().max(512, "Beschreibung zu lang").optional(),
  userId: z.string().cuid("Ungültige User ID"),
  tags: z.array(z.string()).default([])
});

// In Route verwenden
router.post('/', validate(createTodoSchema), TodoController.createTodo);
```

### **Type Inference (Types aus Schemas generieren):**
```typescript
// Schema definieren
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional()
});

// TypeScript Type aus Schema generieren
type User = z.infer<typeof userSchema>;
// Resultat: { id: string; email: string; name?: string }

// In Funktionen verwenden
function processUser(user: User) {
  console.log(user.email);  // TypeScript weiß: ist string
  console.log(user.name);   // TypeScript weiß: ist string | undefined
}
```

---

## 🏗️ **6. Projekt-Architektur & Patterns**

### **MVC Pattern (Model-View-Controller)**
Dein Projekt verwendet eine **modifizierte MVC-Architektur**:

```
src/
├── models/         -> Prisma Schema (Database Models)
├── controllers/    -> Business Logic (Controller)
├── routes/         -> API Endpoints (Router)
├── middleware/     -> Request Processing
├── utils/          -> Helper Functions
├── types/          -> TypeScript Definitions
└── schemas/        -> Validation Schemas
```

#### **Controller Pattern:**
```typescript
// controllers/todoController.ts
export class TodoController {
  // Static Methods = gehören zur Klasse, nicht zur Instanz
  static async getAllTodos(req: Request, res: Response) {
    try {
      // 1. Input validieren (bereits durch Middleware)
      const filters = req.query as TodoFilterQuery;
      
      // 2. Database Query
      const todos = await prisma.todo.findMany({
        where: UserSelectHelper.buildTodoFilter(filters),
        include: { user: true }
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

#### **Helper Pattern:**
```typescript
// utils/databaseHelper.ts
export class UserSelectHelper {
  // Konstante für User Selection
  static CORE_USER_SELECT = {
    user: {
      select: {
        id: true,
        name: true,
        email: true
      }
    }
  } as const;

  // Dynamischer Filter Builder
  static buildTodoFilter(filters: TodoFilterQuery): Prisma.TodoWhereInput {
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

#### **Response Helper Pattern:**
```typescript
// utils/responseHelper.ts
export class ResponseHelper {
  // Generic Response Method
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

  // Convenience Methods
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

### **Type Organization:**
```typescript
// types/requests.ts - Input Types
export type TodoCreateData = z.infer<typeof createTodoSchema>;
export type TodoFilterQuery = z.infer<typeof todoFilterQuerySchema>;

// types/database.ts - Database Types
export interface TodoWithUserData {
  id: string;
  title: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// types/apiRes.ts - Response Types
export interface GetAllTodosApiRes extends StandardApiRes<TodoWithUserData[]> {
  count?: number;
}
```

---

## 🔄 **7. HTTP Methods & RESTful API Design**

### **REST Prinzipien:**
- **Resource-based URLs** (`/api/todos` nicht `/api/getTodos`)
- **HTTP Methods** für verschiedene Aktionen
- **Stateless** (jeder Request ist unabhängig)
- **Konsistente Response-Struktur**

### **HTTP Methods:**
```typescript
// GET - Daten abrufen (READ)
router.get('/api/todos', TodoController.getAllTodos);           // Alle Todos
router.get('/api/todos/:id', TodoController.getSingleTodo);     // Ein Todo

// POST - Neue Daten erstellen (CREATE)
router.post('/api/todos', TodoController.createTodo);           // Todo erstellen

// PUT - Daten komplett ersetzen (UPDATE)
router.put('/api/todos/:id', TodoController.updateTodo);        // Todo aktualisieren

// DELETE - Daten löschen (DELETE)
router.delete('/api/todos/:id', TodoController.deleteTodo);     // Todo löschen

// PATCH - Daten teilweise ändern (UPDATE)
router.patch('/api/todos/:id', TodoController.partialUpdate);   // Teilupdate
```

### **Status Codes:**
```typescript
// 2xx Success
200 // OK - Erfolgreich
201 // Created - Erstellt
204 // No Content - Erfolgreich, aber kein Inhalt

// 4xx Client Error
400 // Bad Request - Ungültige Anfrage
401 // Unauthorized - Nicht angemeldet
403 // Forbidden - Keine Berechtigung
404 // Not Found - Nicht gefunden
422 // Unprocessable Entity - Validation Error

// 5xx Server Error
500 // Internal Server Error - Server Fehler
503 // Service Unavailable - Service nicht verfügbar
```

### **Query Parameters:**
```typescript
// /api/todos?status=OPEN&sortBy=title&sortOrder=asc
app.get('/api/todos', (req, res) => {
  const { status, sortBy, sortOrder, search } = req.query;
  
  // Query Building
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

## 🔒 **8. Environment Variables & Configuration**

### **.env File:**
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

### **dotenv Usage:**
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

## 🛠️ **9. Error Handling Patterns**

### **Try-Catch Pattern:**
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
    
    // Spezifische Errors
    if (error.code === 'P2002') {  // Prisma Unique Constraint
      return ResponseHelper.send400(res, 'Todo already exists');
    }
    
    // Generic Error
    ResponseHelper.send500(res, 'Could not create todo', error);
  }
}
```

### **Error Middleware:**
```typescript
// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error(`Route: ${req.method} ${req.path}`);
  console.error(`Message: ${error.message}`);
  console.error(`Stack: ${error.stack}`);

  // Client Response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: error.message,
      stack: error.stack 
    })
  });
});
```

---

## 📝 **10. Wichtige Konzepte & Best Practices**

### **Async/Await:**
```typescript
// ❌ Falsch - Callback Hell
function fetchUser(id, callback) {
  database.findUser(id, (err, user) => {
    if (err) return callback(err);
    
    database.findTodos(user.id, (err, todos) => {
      if (err) return callback(err);
      
      callback(null, { user, todos });
    });
  });
}

// ✅ Richtig - Async/Await
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

### **Destructuring:**
```typescript
// Object Destructuring
const user = { id: '1', name: 'Max', email: 'max@test.com' };
const { name, email } = user;  // name = 'Max', email = 'max@test.com'

// Mit Rename
const { name: userName, email: userEmail } = user;

// Array Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// Function Parameter Destructuring
function createUser({ name, email }: { name: string; email: string }) {
  return { id: generateId(), name, email };
}
```

### **Spread Operator:**
```typescript
// Object Spread
const user = { id: '1', name: 'Max' };
const userWithEmail = { ...user, email: 'max@test.com' };
// Result: { id: '1', name: 'Max', email: 'max@test.com' }

// Array Spread
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];  // [1, 2, 3, 4, 5]

// Function Arguments
function sum(a: number, b: number, c: number) {
  return a + b + c;
}
const nums = [1, 2, 3];
sum(...nums);  // Equivalent to sum(1, 2, 3)
```

### **Optional Chaining:**
```typescript
// ❌ Ohne Optional Chaining
if (user && user.profile && user.profile.address) {
  console.log(user.profile.address.city);
}

// ✅ Mit Optional Chaining
console.log(user?.profile?.address?.city);  // undefined wenn nicht vorhanden

// Mit Arrays
const firstTodo = user?.todos?.[0]?.title;

// Mit Function Calls
user?.calculateScore?.();  // Nur aufrufen wenn Function existiert
```

### **Nullish Coalescing:**
```typescript
// ❌ Mit || (Probleme bei 0, false, '')
const port = process.env.PORT || 3000;  // Problem: PORT=0 wird zu 3000

// ✅ Mit ?? (nur bei null/undefined)
const port = process.env.PORT ?? 3000;  // PORT=0 bleibt 0

// Kombination mit Optional Chaining
const userCity = user?.profile?.address?.city ?? 'Unknown City';
```

---

## 🔄 **11. Promises & Error Handling**

### **Promise Basics:**
```typescript
// Promise erstellen
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

### **Async/Await Error Handling:**
```typescript
// Single Operation
async function loadUser(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error('Failed to load user:', error);
    return null;
  }
}

// Multiple Operations
async function createUserWithTodo(userData: UserData): Promise<UserWithTodos> {
  try {
    // Transaction für Atomicity
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

## 📚 **12. Zusammenfassung der wichtigsten Konzepte**

### **Backend Development Workflow:**
1. **Setup**: `package.json`, `tsconfig.json`, Dependencies
2. **Database**: Prisma Schema definieren, Migrations
3. **Types**: TypeScript Interfaces und Types definieren
4. **Validation**: Zod Schemas für Input-Validation
5. **Routes**: Express Router für API Endpoints
6. **Controllers**: Business Logic in Controller Classes
7. **Middleware**: Validation, Logging, Error Handling
8. **Utils**: Helper Functions für Database und Responses
9. **Testing**: API Endpoints testen

### **Key Patterns:**
- **MVC Architecture**: Separation of Concerns
- **Type Safety**: TypeScript für Compile-Time Errors
- **Validation**: Runtime Validation mit Zod
- **Error Handling**: Try-Catch mit spezifischen Error Types
- **Helper Classes**: Static Methods für wiederverwendbare Logik
- **Response Standardization**: Einheitliche API Responses

### **Production Readiness:**
- Environment Variables für Configuration
- Proper Error Logging
- Input Validation auf allen Endpoints
- Database Transactions für Data Integrity
- TypeScript für Type Safety
- Modular Code Structure

---

## 🎯 **Das hast du gemeistert:**

✅ **Node.js & Express.js** - Web-Server Development
✅ **TypeScript** - Type-Safe Programming
✅ **Prisma ORM** - Database Management
✅ **PostgreSQL** - Relational Database
✅ **Zod Validation** - Runtime Type Checking
✅ **RESTful API Design** - HTTP Methods & Status Codes
✅ **Error Handling** - Robust Application Development
✅ **Project Architecture** - Clean Code Organization
✅ **Modern JavaScript** - Async/Await, Destructuring, Spread Operator

**Du bist jetzt bereit für professionelle Backend-Entwicklung! 🚀**
