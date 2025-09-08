# Todoo-Note Backend

## 🚀 Technologie-Stack

- **Backend Framework**: Express.js mit TypeScript
- **Datenbank**: PostgreSQL mit Prisma ORM
- **Validierung**: Zod
- **Authentifizierung**: Passport.js (lokale Strategie)
-B

## 📁 Projekt-Struktur

```
src/
├── controllers/          # Route-Handler (Controller)
├── routes/              # API-Routen
├── middleware/          # Custom Middleware
├── schemas/             # Zod-Validierungsschemas
└── index.ts             # Haupt-Server-Datei

prisma/
└── schema.prisma        # Datenbankschema

test-api.js             # Einfache Test-Datei
```

## 🛠️ Geplante Features

### Core Features
- Basis-Setup mit Express + TypeScript
- Postgres + Prisma Integration
- Zod-Validierung
- Router/Controller-Struktur
- Logging Middleware
- CRUD-Operationen für Todos
- User-Authentifizierung (Passport)
- Todo-Features (Titel, Beschreibung, Status, etc.)

### Todo-Eigenschaften
- Titel
- Beschreibung
- Status (offen/erledigt)
- Optionales Ablaufdatum
- Tags für Suche
- Konfigurierbare E-Mail-Erinnerungen

### Spätere Features
- Rechteverwaltung via CASL
- E-Mail-Benachrichtigungen
- Erweiterte Suchfunktionen

##  Setup & Installation

1. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

2. **Umgebungsvariablen konfigurieren**:
   - Kopiere `.env.example` zu `.env`
   - Konfiguriere deine PostgreSQL-Datenbankverbindung

3. **Prisma konfigurieren**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Development-Server starten**:
   ```bash
   npm run dev
   ```

## 📊 API-Endpunkte

### Status
- `GET /` - API-Information
- `GET /health` - Health Check

### Todos
- `GET /api/todos` - Alle Todos abrufen (mit Filtering)
- `POST /api/todos` - Neues Todo erstellen
- `GET /api/todos/:id` - Spezifisches Todo abrufen
- `PUT /api/todos/:id` - Todo aktualisieren
- `DELETE /api/todos/:id` - Todo löschen
- `GET /api/todos/user/:userId` - Alle Todos eines Users

## 🔍 Todo Filtering & Suche

Die `GET /api/todos` Route unterstützt umfangreiche Filtering-Optionen über Query-Parameter:

### Text-basierte Filter
```bash
# Suche nach Titel
GET /api/todos?title=einkaufen

# Suche in Beschreibung
GET /api/todos?description=projekt

# Suche nach User-Name
GET /api/todos?userName=Max
```

### Status & User Filter
```bash
# Todos mit bestimmtem Status
GET /api/todos?status=COMPLETED
GET /api/todos?status=PENDING

# Todos von bestimmtem User
GET /api/todos?userId=user123
```

### Datum-Filter
```bash
# Todos die nach einem Datum ablaufen
GET /api/todos?expiresAfter=2025-01-01T00:00:00.000Z

# Todos die vor einem Datum ablaufen
GET /api/todos?expiresBefore=2025-12-31T23:59:59.000Z

# Todos erstellt nach einem Datum
GET /api/todos?createdAfter=2025-01-01T00:00:00.000Z

# Todos erstellt vor einem Datum
GET /api/todos?createdBefore=2025-01-31T23:59:59.000Z
```

### Tag-Filter
```bash
# Todos mit bestimmten Tags (Komma-getrennt)
GET /api/todos?tags=work,urgent

# Todos mit einem spezifischen Tag
GET /api/todos?hasTag=urgent
```

### Sorting & Pagination
```bash
# Nach Feld sortieren
GET /api/todos?sortBy=title&sortOrder=asc
GET /api/todos?sortBy=createdAt&sortOrder=desc
GET /api/todos?sortBy=expiresAt&sortOrder=asc

# Verfügbare sortBy Optionen:
# - title, createdAt, expiresAt, status, userName

# Pagination
GET /api/todos?limit=10&offset=20
```

### Kombinierte Filter
```bash
# Komplexe Suche
GET /api/todos?status=PENDING&userId=user123&title=projekt&sortBy=createdAt&limit=5

# Alle offenen Todos, die in der nächsten Woche ablaufen
GET /api/todos?status=PENDING&expiresAfter=2025-01-01T00:00:00.000Z&expiresBefore=2025-01-08T00:00:00.000Z&sortBy=expiresAt

# Todos mit work-Tag von einem bestimmten User
GET /api/todos?hasTag=work&userName=Max&sortBy=createdAt&sortOrder=desc
```

### Filter-Parameter Übersicht

| Parameter | Typ | Beschreibung | Beispiel |
|-----------|-----|--------------|----------|
| `title` | string | Suche im Titel (case-insensitive) | `?title=einkaufen` |
| `description` | string | Suche in Beschreibung (case-insensitive) | `?description=projekt` |
| `status` | enum | Todo-Status | `?status=COMPLETED` |
| `userId` | string | User-ID (CUID) | `?userId=user123` |
| `userName` | string | User-Name (case-insensitive) | `?userName=Max` |
| `expiresAfter` | datetime | Ablauf nach Datum | `?expiresAfter=2025-01-01T00:00:00.000Z` |
| `expiresBefore` | datetime | Ablauf vor Datum | `?expiresBefore=2025-12-31T23:59:59.000Z` |
| `createdAfter` | datetime | Erstellt nach Datum | `?createdAfter=2025-01-01T00:00:00.000Z` |
| `createdBefore` | datetime | Erstellt vor Datum | `?createdBefore=2025-01-31T23:59:59.000Z` |
| `tags` | string | Komma-getrennte Tags | `?tags=work,urgent` |
| `hasTag` | string | Spezifischer Tag | `?hasTag=urgent` |
| `sortBy` | enum | Sortierfeld | `?sortBy=createdAt` |
| `sortOrder` | enum | Sortierreihenfolge (asc/desc) | `?sortOrder=desc` |
| `limit` | number | Max. Anzahl Ergebnisse (max 100) | `?limit=10` |
| `offset` | number | Anzahl zu überspringende Ergebnisse | `?offset=20` |

##  Testen

Der Server läuft standardmäßig auf `http://localhost:3000`.
