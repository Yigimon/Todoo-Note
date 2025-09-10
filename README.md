# Todoo-Note Backend

## 🚀 Technologie-Stack

- **Backend Framework**: Express.js mit TypeScript  
- **Datenbank**: PostgreSQL mit Prisma ORM
- **Validierung**: Zod Schemas
- **Query Filtering**: Prisma Query API mit Advanced Filtering
- **Type Safety**: TypeScript + Prisma Client
- **Middleware**: Custom Validation & Logging
- **Development**: Hot Reload mit Nodemon

## 📁 Projekt-Struktur

```
src/
├── controllers/         # Route-Handler (Controller)
├── routes/              # API-Routen
├── middleware/          # Custom Validation & Logging
├── schemas/             # Zod-Validierungsschemas
├── types/               # TypeScript Type Definitions
├── utils/               # Helper Classes (Database, Response)
└── index.ts             # Haupt-Server-Datei
prisma/
├── schema.prisma        # Datenbankschema
├── seed.ts              # Database Seeding
└── migrations/          # Database Migrations
```

## � API-Endpunkte & Query-Parameter

### **Base URL:** `http://localhost:3000`

### **Todo Routes:**

#### **1. Alle Todos abrufen (mit erweiterten Filtern)**
```http
GET /api/todos
```

**Query-Parameter (alle optional):**
```bash
# Text-basierte Filter
?title=test                    # Suche im Titel
?description=wichtig           # Suche in Beschreibung  
?search=urgent                 # Suche in Titel UND Beschreibung

# Status & User Filter
?status=OPEN                   # Filter nach Status (NEW/OPEN/COMPLETED)
?userId=cm123456789            # Filter nach bestimmtem User

# Datum Filter (ISO Format: yyyy-mm-dd)
?createdAt=2025-09-09          # Todos erstellt an diesem Tag
?expiresAt=2025-12-31          # Todos die an diesem Tag ablaufen

# Sortierung
?sortBy=title                  # Sortieren nach: title, createdAt, status, expiresAt
?sortOrder=asc                 # Reihenfolge: asc oder desc (default: desc)
```

**Beispiele:**
```bash
# Alle offenen Todos
GET /api/todos?status=OPEN

# Suche nach "wichtig" in Titel oder Beschreibung
GET /api/todos?search=wichtig

# Todos von heute, sortiert nach Titel
GET /api/todos?createdAt=2025-09-09&sortBy=title&sortOrder=asc

# Tag-Filter: Nur Todos mit "work" Tag
GET /api/todos?hasTag=work

# Mehrere Tags: Todos die sowohl "work" als auch "urgent" haben
GET /api/todos?tags=work,urgent

# Kombinierte Filter
GET /api/todos?status=OPEN&hasTag=work&sortBy=expiresAt
```

#### **2. Einzelnes Todo abrufen**
```http
GET /api/todos/:id
```

#### **3. Neues Todo erstellen**
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Neue Aufgabe",
  "description": "Beschreibung der Aufgabe",
  "userId": "cm123456789",
  "expiresAt": "2025-12-31T23:59:59Z",
  "tags": ["work", "important"],
  "reminder": "2025-12-30T10:00:00Z"
}
```

#### **4. Todo aktualisieren**
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Aktualisierter Titel",
  "status": "COMPLETED",
  "description": "Neue Beschreibung"
}
```

#### **5. Todo löschen**
```http
DELETE /api/todos/:id
```

## 🔍 Advanced Filtering Beispiele

### **Kombination mehrerer Filter:**
```bash
# Alle offenen Todos von User XYZ mit "projekt" im Text
GET /api/todos?userId=cm123&status=OPEN&search=projekt

# Todos die heute ablaufen, sortiert nach Priorität
GET /api/todos?expiresAt=2025-09-09&sortBy=title

# Alle Todos mit "urgent" im Titel, erstellt in letzter Woche
GET /api/todos?title=urgent&createdAt=2025-09-02
```

### **Response Format:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "cm123456789",
      "title": "Wichtige Aufgabe",
      "description": "Das muss heute fertig werden",
      "status": "OPEN",
      "expiresAt": "2025-09-09T23:59:59.000Z",
      "tags": ["work", "urgent"],
      "remindAt": "2025-09-09T10:00:00.000Z",
      "createdAt": "2025-09-09T08:00:00.000Z",
      "updatedAt": "2025-09-09T08:00:00.000Z",
      "userId": "cm987654321",
      "user": {
        "id": "cm987654321",
        "name": "Max Mustermann",
        "email": "max@example.com"
      }
    }
  ]
}
```

### 🔧 Aktuell unterstützte Parameter

| Parameter | Typ | Beschreibung | Beispiel |
|-----------|-----|--------------|----------|
| `title` | string | Suche im Titel (case-insensitive) | `?title=einkaufen` |
| `status` | enum | Todo-Status (NEW/OPEN/COMPLETED) | `?status=COMPLETED` |
| `userId` | string | User-ID (CUID) | `?userId=clm123abc456def789` |
| `hasTag` | string | Hat bestimmten Tag | `?hasTag=work` |
| `tags` | string | Hat alle Tags (komma-getrennt) | `?tags=work,urgent` |
| `sortBy` | enum | Sortierfeld (createdAt/title/status) | `?sortBy=createdAt` |
| `sortOrder` | enum | Sortierreihenfolge (asc/desc) | `?sortOrder=desc` |




