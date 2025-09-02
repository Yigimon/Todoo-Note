# Todoo-Note Backend

Ein modernes Backend für eine Todo-Liste/Notes-Anwendung.

## 🚧 **AKTUELLER STATUS & NÄCHSTE SCHRITTE:**

### ✅ **FERTIG:**
- Backend Setup (Express + TypeScript)
- PostgreSQL + Prisma konfiguriert
- Basis-Controller implementiert (`getAllTodos` funktioniert)
- Middleware & Validierung
- Server läuft auf Port 3000

### ❌ **TODO - NÄCHSTE SCHRITTE:**

#### **1. SOFORT (höchste Priorität):**
```bash
# 1. Routes mit Server verbinden (src/index.ts):
#    import todoRoutes from './routes/todos';
#    app.use('/api/todos', todoRoutes);

# 2. Database Migration ausführen:
pnpm prisma:migrate

# 3. Testen:
# GET http://localhost:3000/api/todos
```

#### **2. DANACH:**
- ❌ Restliche Controller implementieren (`createTodo`, `getTodoById`, etc.)
- ❌ Authentifizierung hinzufügen (User Registration/Login)
- ❌ Tests schreiben

### 🔧 **Aktuell funktioniert:**
- ✅ `GET /` - API Info
- ✅ `GET /health` - Health Check
- ❌ `GET /api/todos` - **NICHT VERBUNDEN!**

## 📊 **Fortschritt: ~35% fertig**

**NÄCHSTER SCHRITT: Routes verbinden!** 🚀

## 🚀 Technologie-Stack

- **Backend Framework**: Express.js mit TypeScript
- **Datenbank**: PostgreSQL mit Prisma ORM
- **Validierung**: Zod
- **Authentifizierung**: Passport.js (lokale Strategie)
- **Sicherheit**: Helmet, CORS
- **Logging**: Morgan + Custom Logger

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
- ✅ Basis-Setup mit Express + TypeScript
- ✅ Postgres + Prisma Integration
- ✅ Zod-Validierung
- ✅ Router/Controller-Struktur
- ✅ Logging Middleware
- 🚧 CRUD-Operationen für Todos
- 🚧 User-Authentifizierung (Passport)
- 🚧 Todo-Features (Titel, Beschreibung, Status, etc.)

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

## 🔧 Setup & Installation

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

## 🧪 Testen

Der Server läuft standardmäßig auf `http://localhost:3000`.

- Haupt-Endpunkt: http://localhost:3000
- Health Check: http://localhost:3000/health

## 📝 Entwicklungsnotizen

Dieses Projekt ist als Basis-Setup angelegt. Die eigentliche Implementierung der CRUD-Operationen und Authentifizierung erfolgt schrittweise.

### Nächste Schritte
1. Datenbank-Setup (PostgreSQL)
2. Prisma-Migrationen ausführen
3. Todo-Controller implementieren
4. Authentifizierung einrichten
5. Tests schreiben 
