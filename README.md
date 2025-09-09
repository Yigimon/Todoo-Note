# Todoo-Note Backend

## 🚀 Technologie-Stack

- **Backend Framework**: Express.js mit TypeScript  
- **Datenbank**: PostgreSQL mit Prisma ORM
- **Validierung**: Zod Schemas
- **Query Filtering**: Prisma Query API
- **Type Safety**: TypeScript + Prisma Client
- **Middleware**: Custom Validation & Logging

## 📁 Projekt-Struktur

```
src/
├── controllers/          # Route-Handler (Controller)
├── routes/              # API-Routen
├── middleware/          # Custom Middleware
├── schemas/             # Zod-Validierungsschemas
├── index.ts             # Haupt-Server-Datei
├── types                # Typenvalidierung für Response
└── utils                # Auslagerung in Klassen 
prisma/
└── schema.prisma        # Datenbankschema

test-api.js             # Einfache Test-Datei
```

## 🛠️ Implementierte Features

### ✅ Core Features (Fertig)
- ✅ Express + TypeScript Setup
- ✅ PostgreSQL + Prisma Integration  
- ✅ Zod-Validierung für alle Endpunkte
- ✅ Router/Controller-Struktur
- ✅ Logging Middleware
- ✅ Vollständige CRUD-Operationen für Todos
- ✅ Type-safe API Responses
- ✅ Prisma-basierte Query-Filterung

### ✅ Todo-Funktionen (Implementiert)
- ✅ **Titel** (max 64 Zeichen, erforderlich)
- ✅ **Beschreibung** (max 512 Zeichen, optional)
- ✅ **Status** (NEW/OPEN/COMPLETED Enum)
- ✅ **Ablaufdatum** (expiresAt, optional)
- ✅ **Tags** (String Array für Kategorisierung)
- ✅ **Erinnerungen** (remindAt, optional)
- ✅ **User-Zuordnung** (userId mit CUID)
- ✅ **Automatische Timestamps** (createdAt/updatedAt)

### 🔄 Geplante Features
- 🔄 User-Authentifizierung (Passport.js)
- 🔄 Erweiterte Filterung (Tags, Datum, Beschreibung)
- 🔄 Pagination für große Datenmengen
- 🔄 Rechteverwaltung via CASL
- 🔄 E-Mail-Benachrichtigungen
- 🔄 Full-Text-Suche

##  Setup & Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/Yigimon/Todoo-Note.git
   cd Todoo-Note
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   pnpm install
   ```

3. **Umgebungsvariablen konfigurieren**:
   - Erstelle `.env` Datei im Root-Verzeichnis
   - Konfiguriere deine PostgreSQL-Datenbankverbindung:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todoo_note"
   ```

4. **Prisma konfigurieren**:
   ```bash
   # Prisma Client generieren
   pnpm prisma generate
   
   # Datenbank-Migration ausführen
   pnpm prisma migrate dev
   
   # (Optional) Seed-Daten einfügen
   pnpm prisma db seed
   ```

5. **Development-Server starten**:
   ```bash
   pnpm run dev
   ```

   Der Server läuft auf `http://localhost:3000`

## 📋 Verfügbare Scripts

```bash
# Development
pnpm run dev          # Server mit nodemon starten
pnpm run build        # TypeScript kompilieren
pnpm run start        # Produktions-Server starten

# Prisma
pnpm prisma studio    # Prisma Studio öffnen
pnpm prisma migrate   # Migration ausführen
pnpm prisma generate  # Prisma Client generieren
```

## 📊 API-Endpunkte

### Status
- `GET /` - API-Information
- `GET /health` - Health Check

### Todos (vollständig implementiert)
- `GET /api/todos` - Alle Todos abrufen (mit Filterung)
- `POST /api/todos` - Neues Todo erstellen
- `GET /api/todos/:id` - Spezifisches Todo abrufen
- `PUT /api/todos/:id` - Todo aktualisieren
- `DELETE /api/todos/:id` - Todo löschen
- `GET /api/todos/user/:userId` - Alle Todos eines Users

### Todo Datenmodell
```typescript
{
  id: string,           // CUID
  title: string,        // Max 64 Zeichen
  description?: string, // Max 512 Zeichen, optional
  status: "NEW" | "OPEN" | "COMPLETED",
  expiresAt?: Date,     // Optional
  tags: string[],       // Array von Tags
  remindAt?: Date,      // Optional
  createdAt: Date,
  updatedAt: Date,
  userId: string,       // CUID des Users
  user: {               // Embedded User-Daten
    id: string,
    name?: string,
    email: string
  }
}
```

## 🔍 Aktuelle Filterung & Suche

Die `GET /api/todos` Route unterstützt folgende **implementierte** Filter über Query-Parameter:

### 🟢 Implementierte Filter

#### Text-basierte Filter
```bash
# Suche nach Titel (case-insensitive)
GET /api/todos?title=einkaufen
```

#### Status & User Filter
```bash
# Todos mit bestimmtem Status
GET /api/todos?status=NEW
GET /api/todos?status=OPEN  
GET /api/todos?status=COMPLETED

# Todos von bestimmtem User (CUID)
GET /api/todos?userId=clm123abc456def789
```

#### Sortierung
```bash
# Nach Feld sortieren (implementiert)
GET /api/todos?sortBy=createdAt&sortOrder=desc  # Standard
GET /api/todos?sortBy=title&sortOrder=asc
GET /api/todos?sortBy=status&sortOrder=desc

# Verfügbare sortBy Optionen:
# - createdAt (Standard), title, status
```

#### Kombinierte Filter
```bash
# Alle offenen Todos eines Users, nach Titel sortiert
GET /api/todos?status=OPEN&userId=clm123abc456def789&sortBy=title&sortOrder=asc

# Todos mit Titel-Suche und Status
GET /api/todos?title=projekt&status=NEW&sortBy=createdAt
```

### 🔧 Aktuell unterstützte Parameter

| Parameter | Typ | Status | Beschreibung | Beispiel |
|-----------|-----|--------|--------------|----------|
| `title` | string | ✅ Implementiert | Suche im Titel (case-insensitive) | `?title=einkaufen` |
| `status` | enum | ✅ Implementiert | Todo-Status (NEW/OPEN/COMPLETED) | `?status=COMPLETED` |
| `userId` | string | ✅ Implementiert | User-ID (CUID) | `?userId=clm123abc456def789` |
| `sortBy` | enum | ✅ Implementiert | Sortierfeld (createdAt/title/status) | `?sortBy=createdAt` |
| `sortOrder` | enum | ✅ Implementiert | Sortierreihenfolge (asc/desc) | `?sortOrder=desc` |

### 🔄 Geplante Erweiterungen

Diese Filter sind noch **nicht implementiert**, aber im Schema vorbereitet:

```bash
# Datum-Filter (geplant)
GET /api/todos?expiresAfter=2025-01-01T00:00:00.000Z
GET /api/todos?expiresBefore=2025-12-31T23:59:59.000Z

# Tag-Filter (geplant)
GET /api/todos?tags=work,urgent
GET /api/todos?hasTag=urgent

# Erweiterte Suche (geplant)
GET /api/todos?description=projekt

# Pagination (geplant)
GET /api/todos?limit=10&offset=20
```

##  Testen der API

### Basis-Endpunkte testen

```bash
# Health Check
curl http://localhost:3000/health

# Alle Todos abrufen
curl http://localhost:3000/api/todos

# Todo mit Filterung
curl "http://localhost:3000/api/todos?status=OPEN&sortBy=title&sortOrder=asc"

# Neues Todo erstellen
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beispiel Todo",
    "description": "Das ist ein Test",
    "userId": "clm123abc456def789",
    "tags": ["test", "api"]
  }'

# Todo aktualisieren
curl -X PUT http://localhost:3000/api/todos/[TODO_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aktualisierter Titel",
    "status": "COMPLETED"
  }'

# Todo löschen
curl -X DELETE http://localhost:3000/api/todos/[TODO_ID]
```

### Response-Format

Alle API-Endpunkte geben folgendes standardisiertes Format zurück:

```typescript
{
  "success": true,
  "message": "Optional success message",
  "data": TodoObject | TodoArray | null,
  // Bei Fehlern:
  "error": "Error description"
}
```

### 🗂️ Technische Details

**Prisma-basierte Filterung:**
- Query-Parameter werden über Zod-Schemas validiert
- Prisma `whereClause` wird dynamisch aus Query-Parametern erstellt
- Type-safe durch TypeScript + Prisma Client
- Automatische SQL-Optimierung durch Prisma

**Implementierte Filter-Logik:**
```typescript
// Beispiel aus UserSelectHelper.buildTodoFilter()
static buildTodoFilter(filters: TodoFilterQuery): Prisma.TodoWhereInput {
  const whereClause: Prisma.TodoWhereInput = {};
  
  if (filters.status) {
    whereClause.status = filters.status;
  }
  
  if (filters.title) {
    whereClause.title = { contains: filters.title, mode: 'insensitive' };
  }
  
  return whereClause;
}
```
