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

### Todos (geplant)
- `GET /api/todos` - Alle Todos abrufen
- `POST /api/todos` - Neues Todo erstellen
- `GET /api/todos/:id` - Spezifisches Todo abrufen
- `PUT /api/todos/:id` - Todo aktualisieren
- `DELETE /api/todos/:id` - Todo löschen
- `GET /api/todos/user/:userId` - Alle Todos eines Users

##  Testen

Der Server läuft standardmäßig auf `http://localhost:3000`.
