# 🎓 Todoo-Note App - Vollständiger Lernguide

## Inhaltsverzeichnis
1. [Grundprinzipien von React](#1-grundprinzipien-von-react)
2. [Projektstruktur verstehen](#2-projektstruktur-verstehen)
3. [Components (Komponenten)](#3-components-komponenten)
4. [Hooks](#4-hooks)
5. [Services](#5-services)
6. [Pages](#6-pages)
7. [App.tsx - Das Herzstück](#7-apptsx---das-herzstück)
8. [Datenfluss verstehen](#8-datenfluss-verstehen)
9. [Authentication (Login-System)](#9-authentication-login-system)
10. [Todo-Funktionalität](#10-todo-funktionalität)

---

## 1. Grundprinzipien von React

### Was ist React?
React ist eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen. Stell dir vor, deine Website ist wie ein LEGO-Baukasten - jedes Teil (Component) kann wiederverwendet werden.

### Die 3 Kern-Konzepte:

#### 1.1 Components (Komponenten)
```tsx
// Eine Komponente ist wie ein Baustein
function Begrüßung() {
  return <h1>Hallo Welt!</h1>;
}
```
**Wichtig zu verstehen:**
- Eine Komponente ist eine Funktion, die HTML (JSX) zurückgibt
- Komponenten können wiederverwendet werden
- Komponenten können ineinander verschachtelt werden

#### 1.2 Props (Properties)
```tsx
// Props sind wie Parameter für deine Komponente
function Begrüßung(props) {
  return <h1>Hallo {props.name}!</h1>;
}

// Verwendung:
<Begrüßung name="Max" />  // Zeigt: "Hallo Max!"
```
**Wichtig zu verstehen:**
- Props übergeben Daten von Eltern- zu Kind-Komponenten
- Props können nur von oben nach unten fließen (wie Wasser bergab)
- Props sind "read-only" (können nicht verändert werden)

#### 1.3 State (Zustand)
```tsx
// State ist wie das "Gedächtnis" einer Komponente
function Zähler() {
  const [zahl, setZahl] = useState(0);  // State erstellen
  
  return (
    <div>
      <p>Du hast {zahl} mal geklickt</p>
      <button onClick={() => setZahl(zahl + 1)}>
        Klick mich!
      </button>
    </div>
  );
}
```
**Wichtig zu verstehen:**
- State speichert Daten, die sich ändern können
- Wenn State sich ändert, wird die Komponente neu gerendert
- `useState` gibt dir [wert, setter-Funktion] zurück

---

## 2. Projektstruktur verstehen

```
frontend/src/
├── App.tsx              ← Hauptkomponente (Einstiegspunkt)
├── main.tsx             ← Startet die App
│
├── components/          ← Wiederverwendbare UI-Bausteine
│   ├── common/          ← Allgemeine Komponenten
│   ├── login/           ← Login-spezifische Komponenten
│   └── todos/           ← Todo-spezifische Komponenten
│
├── hooks/               ← Custom Hooks (wiederverwendbare Logik)
│
├── pages/               ← Ganze Seiten (kombinieren Components)
│
├── services/            ← Backend-Kommunikation & Logik
│
└── assets/              ← Bilder, Icons, etc.
```

### Die Hierarchie verstehen:
```
main.tsx
  └── App.tsx
       ├── logIn.tsx (Page)
       │    └── mainPage.tsx (Component)
       │
       └── MainTodos.tsx (Page)
            ├── NavigationBar (Component)
            ├── SearchBar (Component)
            ├── TodoKanbanBoard (Component)
            │    ├── StatusColumns (Component)
            │    └── TodoStatusButtons (Component)
            ├── CreateTodoPopUp (Component)
            ├── EditTodoPopUp (Component)
            └── FloatingActionButton (Component)
```

---

## 3. Components (Komponenten)

### Was sind Components?
Components sind wiederverwendbare UI-Bausteine. Wie LEGO-Steine, die du immer wieder verwenden kannst.

### Beispiel aus deiner App: `FloatingActionButton.tsx`

```tsx
// 1. IMPORTS - Was brauchst du?
import Fab from '@mui/material/Fab';        // Material-UI Button
import AddIcon from '@mui/icons-material/Add';  // Plus-Icon

// 2. INTERFACE - Welche Props akzeptiert die Komponente?
interface FloatingActionButtonProps {
  onAdd?: () => void;  // ? = optional, () => void = Funktion ohne Rückgabewert
}

// 3. KOMPONENTE - Die Funktion selbst
export default function FloatingActionButton({ onAdd }: FloatingActionButtonProps) {
  return (
    <Fab 
      color="primary"           // Farbe
      aria-label="add"          // Für Accessibility
      onClick={onAdd}           // Wenn geklickt, führe onAdd aus
      sx={{                     // Styling
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <AddIcon />               {/* Das Plus-Icon */}
    </Fab>
  );
}
```

### Anatomie einer Komponente:

```
┌─────────────────────────────────────────┐
│ IMPORTS                                 │  Was brauchst du?
├─────────────────────────────────────────┤
│ INTERFACES/TYPES                        │  Was kommt rein?
├─────────────────────────────────────────┤
│ KOMPONENTEN-FUNKTION                    │  Was macht sie?
│  ├── HOOKS (useState, useEffect, etc.)  │  State & Effekte
│  ├── FUNKTIONEN (onClick-Handler, etc.) │  Event-Handler
│  └── RETURN (JSX)                       │  Was wird angezeigt?
└─────────────────────────────────────────┘
```

### Komplexeres Beispiel: `TodoKanbanBoard.tsx`

```tsx
// Was du selbst hinzugefügt hast:

// 1. State für UI-Kontrolle
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

// Erklärt:
// - deleteDialogOpen: Boolean - ist der Dialog offen?
// - setDeleteDialogOpen: Funktion zum Ändern des Wertes
// - todoToDelete: String oder null - welches Todo soll gelöscht werden?
```

```tsx
// 2. Event-Handler Funktionen
const handleDeleteClick = (todoId: string) => {
  setTodoToDelete(todoId);        // Speichere welches Todo
  setDeleteDialogOpen(true);      // Öffne den Dialog
};

const handleDeleteConfirm = () => {
  if (todoToDelete) {
    onDeleteTodo(todoToDelete);   // Lösche das Todo
    setDeleteDialogOpen(false);   // Schließe Dialog
    setTodoToDelete(null);        // Reset State
  }
};

// Erklärt:
// handleDeleteClick: Bereitet das Löschen vor
// handleDeleteConfirm: Führt das Löschen aus
```

---

## 4. Hooks

### Was sind Hooks?
Hooks sind spezielle Funktionen, die React-Features in Komponenten verfügbar machen. Sie beginnen immer mit `use`.

### Built-in React Hooks:

#### 4.1 `useState` - State verwalten
```tsx
const [wert, setWert] = useState(initialWert);

// Beispiel aus deiner App:
const [todos, setTodos] = useState<Todo[]>([]);
```
**Wann benutzen?**
- Wenn sich Daten ändern können (z.B. Formular-Eingaben, offene/geschlossene Dialoge)
- Wenn die Änderung die UI neu rendern soll

#### 4.2 `useEffect` - Nebenwirkungen ausführen
```tsx
useEffect(() => {
  // Code hier läuft nach dem Rendern
  
  return () => {
    // Cleanup (optional)
  };
}, [abhängigkeiten]);
```

**Beispiel aus deiner App:**
```tsx
// In App.tsx
useEffect(() => {
  checkAuthStatus();  // Prüfe Login-Status beim Start
}, []);  // Leeres Array = nur einmal beim Mount

// In MainTodos.tsx
useEffect(() => {
  refreshTodos();  // Lade Todos neu wenn sich Filter ändern
}, [filters]);  // Läuft wenn sich 'filters' ändert
```

**Wann benutzen?**
- API-Calls beim Laden der Komponente
- Subscriptions (z.B. WebSockets)
- Timer setzen
- DOM-Manipulationen

### Custom Hooks - Deine eigenen Hooks!

#### 4.3 `useAuth` - Authentication Logic

**Datei:** `frontend/src/hooks/useAuth.ts`

```tsx
export const useAuth = () => {
  // 1. STATE - Speichert Login-Daten
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. FUNKTIONEN - Was kann der Hook?
  
  // Login-Funktion
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);  // API-Call
      setUser(response.user);  // Speichere User im State
    } catch (err) {
      setError('Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  // Weitere Funktionen: logout, register, checkAuthStatus...

  // 3. RETURN - Was gibt der Hook zurück?
  return { user, loading, error, login, logout, register, checkAuthStatus };
};
```

**Wie wird er benutzt?**
```tsx
// In einer Komponente:
function LoginPage() {
  const { user, login, loading, error } = useAuth();
  
  const handleSubmit = () => {
    login(email, password);
  };
  
  if (loading) return <div>Lädt...</div>;
  if (error) return <div>{error}</div>;
  if (user) return <div>Eingeloggt als {user.name}</div>;
  
  return <LoginForm onSubmit={handleSubmit} />;
}
```

#### 4.4 `useTodos` - Todo-Management

**Datei:** `frontend/src/hooks/useTodos.ts`

```tsx
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Lade Todos vom Backend
  const refreshTodos = async (filters?: FilterState) => {
    setLoading(true);
    try {
      const data = await TodoFilterService.fetchFilteredTodos(filters);
      setTodos(data);  // Aktualisiere State
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    } finally {
      setLoading(false);
    }
  };

  // Füge neues Todo hinzu
  const addTodo = async (todoData: CreateTodoData) => {
    const newTodo = await createTodoAxios(todoData);
    setTodos([...todos, newTodo]);  // Füge zum Array hinzu
  };

  // Update Todo
  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    await updateTodoAxios(id, updates);
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  // Lösche Todo
  const deleteTodo = async (id: string) => {
    await deleteTodoAxios(id);
    setTodos(todos.filter(todo => todo.id !== id));  // Entferne aus Array
  };

  return { todos, loading, refreshTodos, addTodo, updateTodo, deleteTodo };
};
```

**Warum Custom Hooks?**
- ✅ Wiederverwendbare Logik
- ✅ Komponenten bleiben sauber und übersichtlich
- ✅ Trennung von Logik und UI
- ✅ Einfacher zu testen

#### 4.5 Weitere Hooks in deiner App:

**`useFilters`** - Verwaltet Filter-State
```tsx
const { filters, updateFilters } = useFilters();
```

**`useTodoForm`** - Verwaltet Todo-Formular
```tsx
const { formData, handleChange, resetForm } = useTodoForm(initialData);
```

**`useTodoSelection`** - Verwaltet Checkbox-Auswahl
```tsx
const { selectedTodos, toggleSelection, clearSelection } = useTodoSelection();
```

---

## 5. Services

### Was sind Services?
Services sind Module, die spezifische Aufgaben erledigen - meistens Backend-Kommunikation oder komplexe Logik.

### 5.1 `authService.ts` - Backend-Kommunikation für Login

```tsx
import axios from 'axios';

// Erstelle einen Axios-Client (HTTP-Client)
const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api',  // Backend-URL
  withCredentials: true,  // Wichtig für Cookies/Sessions!
});

// Login-Funktion
export const loginUser = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', {
    email,
    password
  });
  return response.data;  // { user: {...}, message: "..." }
};

// Logout-Funktion
export const logoutUser = async () => {
  const response = await axiosClient.post('/auth/logout');
  return response.data;
};

// Registrierung
export const registerUser = async (data: RegisterData) => {
  const response = await axiosClient.post('/auth/register', data);
  return response.data;
};

// Prüfe ob eingeloggt
export const getCurrentUser = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};
```

**Wichtige Konzepte:**

1. **axios.create()** - Erstellt einen konfigurierten HTTP-Client
2. **baseURL** - Alle Requests gehen zu dieser Adresse
3. **withCredentials: true** - Sendet Cookies mit (für Session-basierte Auth)
4. **async/await** - Wartet auf Backend-Antwort

### 5.2 `todoServices.ts` - CRUD-Operationen für Todos

```tsx
// CREATE - Neues Todo erstellen
export const createTodoAxios = async (data: CreateTodoData) => {
  const user = await getCurrentUser();
  const response = await axiosClient.post('/todos', {
    ...data,
    userId: user.userId
  });
  return response.data;
};

// READ - Todos abrufen (wird von TodoFilterService gemacht)

// UPDATE - Todo aktualisieren
export const updateTodoAxios = async (id: string, updates: Partial<Todo>) => {
  const user = await getCurrentUser();
  const response = await axiosClient.put(`/todos/${id}`, {
    ...updates,
    userId: user.userId
  });
  return response.data;
};

// DELETE - Todo löschen
export const deleteTodoAxios = async (id: string) => {
  const user = await getCurrentUser();
  await axiosClient.delete(`/todos/${id}`, {
    data: { userId: user.userId }
  });
};

// UPDATE STATUS - Status ändern
export const updateTodoStatusAxios = async (id: string, status: TodoStatus) => {
  const user = await getCurrentUser();
  const response = await axiosClient.patch(`/todos/${id}/status`, {
    status,
    userId: user.userId
  });
  return response.data;
};
```

**CRUD = Create, Read, Update, Delete**

### 5.3 `todoFilterService.ts` - Filter-Logik

```tsx
class TodoFilterService {
  private baseURL = 'http://localhost:3001/api/todos';

  // Lade gefilterte Todos
  async fetchFilteredTodos(filters?: FilterState): Promise<Todo[]> {
    const params = this.buildQueryParams(filters);
    const url = `${this.baseURL}?${params}`;
    
    const response = await fetch(url, {
      credentials: 'include'  // Wichtig für Sessions!
    });
    
    return response.json();
  }

  // Baue Query-String aus Filtern
  private buildQueryParams(filters?: FilterState): string {
    if (!filters) return '';
    
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    
    return params.toString();
  }
}
```

**Wichtig:**
- Services kapseln Backend-Logik
- Komponenten müssen nicht wissen WIE Daten geladen werden
- Erleichtert Änderungen am Backend

---

## 6. Pages

### Was sind Pages?
Pages sind große Komponenten, die ganze Seiten darstellen. Sie kombinieren viele kleinere Components.

### 6.1 `logIn.tsx` - Die Login-Seite

```tsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';  // Custom Hook
import MainPage from '../components/login/mainPage';  // UI-Komponente

export default function LogIn() {
  // State für Formular
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Auth-Hook
  const { login, register, loading, error } = useAuth();

  // Login-Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Verhindere Seiten-Reload
    await login(email, password);
  };

  // Register-Handler
  const handleRegister = async (data: RegisterData) => {
    await register(data);
  };

  // Gib UI-Komponente zurück
  return (
    <MainPage
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      onRegister={handleRegister}
      loading={loading}
      error={error}
    />
  );
}
```

**Struktur:**
```
Page-Komponente
  ├── Importiert Hooks (Logik)
  ├── Importiert UI-Komponenten
  ├── Verwaltet State
  ├── Definiert Event-Handler
  └── Gibt UI-Komponente mit Props zurück
```

### 6.2 `MainTodos.tsx` - Die Haupt-Todo-Seite

```tsx
export default function MainTodos() {
  // 1. HOOKS - Hole benötigte Funktionalität
  const { todos, loading, refreshTodos, addTodo, updateTodo, deleteTodo } = useTodos();
  const { filters, updateFilters } = useFilters();
  const { user } = useAuth();

  // 2. STATE - Lokaler UI-State
  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  // 3. EFFECTS - Seiteneffekte
  useEffect(() => {
    refreshTodos(filters);  // Lade Todos bei Filter-Änderung
  }, [filters]);

  // 4. HANDLER - Event-Handler Funktionen
  const handleCreateTodo = async (data: CreateTodoData) => {
    await addTodo(data);
    setCreatePopupOpen(false);
  };

  const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    setEditPopupOpen(true);
  };

  // 5. RENDER - UI zurückgeben
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh' }}>
      <NavigationBar user={user} />
      <SearchBar onSearchChange={(search) => updateFilters({ search })} />
      <TodoFilter filters={filters} onFiltersChange={updateFilters} />
      
      <TodoKanbanBoard
        todos={todos}
        loading={loading}
        onEditTodo={handleEditTodo}
        onDeleteTodo={deleteTodo}
        onUpdateStatus={updateTodo}
      />
      
      <FloatingActionButton onAdd={() => setCreatePopupOpen(true)} />
      
      <CreateTodoPopUp
        open={createPopupOpen}
        onClose={() => setCreatePopupOpen(false)}
        onSubmit={handleCreateTodo}
      />
      
      <EditTodoPopUp
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSubmit={(updates) => updateTodo(todoToEdit!.id, updates)}
        initialData={todoToEdit}
      />
    </Box>
  );
}
```

**Page vs Component:**
- **Page:** Kombiniert viele Components, verwaltet Haupt-Logik
- **Component:** Kleine, wiederverwendbare UI-Teile

---

## 7. App.tsx - Das Herzstück

```tsx
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import LogIn from './pages/logIn';
import MainTodos from './pages/MainTodos';

// Dark Theme erstellen
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // 1. AUTH-CHECK beim Start
  const { user, loading, checkAuthStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();  // Prüfe ob Session existiert
      setIsChecking(false);
    };
    checkAuth();
  }, []);  // Nur einmal beim Mount

  // 2. LOADING STATE - Zeige Spinner während Check
  if (isChecking || loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  // 3. ROUTING - Zeige richtige Page basierend auf Auth
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {user ? <MainTodos /> : <LogIn />}
    </ThemeProvider>
  );
}
```

**Was passiert hier?**

1. **App startet** → `useEffect` läuft
2. **checkAuthStatus()** → Prüft ob User eingeloggt
3. **Während Check** → Zeige Loading-Spinner
4. **Nach Check:**
   - User eingeloggt? → Zeige `MainTodos`
   - Nicht eingeloggt? → Zeige `LogIn`

**ThemeProvider:**
- Gibt allen Komponenten Zugriff auf das Theme
- Dark Mode für die ganze App

**CssBaseline:**
- Normalisiert CSS über alle Browser
- Setzt Default-Styles für Dark Mode

---

## 8. Datenfluss verstehen

### 8.1 Der komplette Fluss: Login

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER ACTIONS                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    Gibt Email & Passwort ein
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      UI COMPONENT (MainPage)                     │
│  • Input-Felder für Email/Passwort                              │
│  • onClick triggert handleLogin()                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       PAGE (logIn.tsx)                           │
│  const handleLogin = async () => {                               │
│    await login(email, password);  // Hook-Funktion aufrufen      │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      HOOK (useAuth.ts)                           │
│  const login = async (email, password) => {                      │
│    setLoading(true);                                             │
│    const response = await loginUser(email, password); // Service │
│    setUser(response.user);  // State aktualisieren               │
│    setLoading(false);                                            │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE (authService.ts)                      │
│  export const loginUser = async (email, password) => {           │
│    const response = await axiosClient.post('/auth/login', {      │
│      email, password                                             │
│    });                                                           │
│    return response.data;                                         │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      HTTP POST Request
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND API                              │
│  • Prüft Credentials in Datenbank                                │
│  • Erstellt Session                                              │
│  • Sendet Cookie zurück                                          │
│  • Response: { user: {...}, message: "Login successful" }        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      Response zurück
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE empfängt Antwort                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    HOOK aktualisiert State                       │
│  setUser(response.user);  ← User ist jetzt im State!            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    APP.TSX reagiert                              │
│  {user ? <MainTodos /> : <LogIn />}                              │
│  ← User existiert jetzt, zeige MainTodos!                        │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Der komplette Fluss: Todo erstellen

```
User klickt FloatingActionButton
          ↓
MainTodos: setCreatePopupOpen(true)
          ↓
CreateTodoPopUp wird sichtbar
          ↓
User füllt Formular aus & klickt "Erstellen"
          ↓
MainTodos: handleCreateTodo(data)
          ↓
useTodos: addTodo(data)
          ↓
todoServices: createTodoAxios(data)
          ↓
Backend: POST /api/todos
          ↓
Backend: Speichert in Datenbank
          ↓
Backend: Sendet neues Todo zurück
          ↓
useTodos: setTodos([...todos, newTodo])
          ↓
TodoKanbanBoard wird neu gerendert
          ↓
Neues Todo erscheint auf dem Board! ✅
```

---

## 9. Authentication (Login-System)

### Wie funktioniert das Login-System?

#### 9.1 Session-basierte Authentifizierung

```
┌──────────────┐                           ┌──────────────┐
│   FRONTEND   │                           │   BACKEND    │
│              │                           │              │
│ 1. Login     │──── Email + Password ────→│ 2. Prüfe DB  │
│              │                           │              │
│ 4. Speichere │←──── Session Cookie ──────│ 3. Session   │
│    Cookie    │                           │    erstellen │
│              │                           │              │
│ 5. Jeder     │── Cookie mitschicken  ────→│ 6. Prüfe     │
│    Request   │                           │    Session   │
└──────────────┘                           └──────────────┘
```

**Wichtig:**
- **Session:** Der Server "merkt sich" dass du eingeloggt bist
- **Cookie:** Kleiner Text der im Browser gespeichert wird
- **withCredentials: true:** Axios schickt Cookie automatisch mit

#### 9.2 Was du implementiert hast:

**1. Login-Formular (`mainPage.tsx`)**
```tsx
<TextField
  label="Email"
  value={email}
  onChange={(e) => onEmailChange(e.target.value)}
/>
<TextField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => onPasswordChange(e.target.value)}
/>
<Button onClick={onLogin}>Login</Button>
```

**2. Login-Handler (`logIn.tsx`)**
```tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  await login(email, password);  // useAuth Hook
};
```

**3. Auth-Hook (`useAuth.ts`)**
```tsx
const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    const response = await loginUser(email, password);  // Service
    setUser(response.user);  // Speichere User im State
  } catch (err) {
    setError('Login fehlgeschlagen');
  } finally {
    setLoading(false);
  }
};
```

**4. Auth-Service (`authService.ts`)**
```tsx
export const loginUser = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', {
    email,
    password
  });
  return response.data;
};
```

**5. Session-Check beim App-Start (`App.tsx`)**
```tsx
useEffect(() => {
  const checkAuth = async () => {
    await checkAuthStatus();  // Prüft ob Session noch gültig
    setIsChecking(false);
  };
  checkAuth();
}, []);
```

#### 9.3 Warum Session-Check wichtig ist:

**Ohne Session-Check:**
```
User loggt sich ein → Schließt Tab → Öffnet Tab wieder → Muss neu einloggen 😞
```

**Mit Session-Check:**
```
User loggt sich ein → Schließt Tab → Öffnet Tab wieder → Noch eingeloggt! 😊
```

**So funktioniert's:**
1. App startet → `checkAuthStatus()` läuft
2. Backend prüft Session-Cookie
3. Cookie gültig? → User-Daten zurück
4. Frontend setzt User-State → User ist eingeloggt!

---

## 10. Todo-Funktionalität

### 10.1 Die vier Haupt-Operationen (CRUD)

#### CREATE - Todo erstellen

```tsx
// 1. User klickt FloatingActionButton
<FloatingActionButton onAdd={() => setCreatePopupOpen(true)} />

// 2. Popup öffnet sich
<CreateTodoPopUp
  open={createPopupOpen}
  onClose={() => setCreatePopupOpen(false)}
  onSubmit={handleCreateTodo}  // ← Handler
/>

// 3. Handler in MainTodos
const handleCreateTodo = async (data: CreateTodoData) => {
  await addTodo(data);  // useTodos Hook
  setCreatePopupOpen(false);
};

// 4. Hook sendet an Backend
const addTodo = async (todoData: CreateTodoData) => {
  const newTodo = await createTodoAxios(todoData);  // Service
  setTodos([...todos, newTodo]);  // State aktualisieren
};

// 5. Service macht HTTP-Request
export const createTodoAxios = async (data: CreateTodoData) => {
  const user = await getCurrentUser();
  const response = await axiosClient.post('/todos', {
    ...data,
    userId: user.userId
  });
  return response.data;
};
```

#### READ - Todos laden

```tsx
// 1. useEffect in MainTodos
useEffect(() => {
  refreshTodos(filters);  // Lade Todos
}, [filters]);  // Wenn Filter sich ändern, neu laden

// 2. useTodos Hook
const refreshTodos = async (filters?: FilterState) => {
  setLoading(true);
  try {
    const data = await TodoFilterService.fetchFilteredTodos(filters);
    setTodos(data);  // Todos in State speichern
  } finally {
    setLoading(false);
  }
};

// 3. Service mit Filtern
async fetchFilteredTodos(filters?: FilterState): Promise<Todo[]> {
  // Baue URL mit Query-Params
  const params = this.buildQueryParams(filters);
  const url = `${this.baseURL}?${params}`;
  
  const response = await fetch(url, {
    credentials: 'include'  // Session-Cookie mitschicken!
  });
  
  return response.json();
}
```

**Query-Params Beispiel:**
```
http://localhost:3001/api/todos?status=TODO&priority=HIGH&search=React
                                 ↑          ↑             ↑
                              Filter    Filter       Suchbegriff
```

#### UPDATE - Todo bearbeiten

```tsx
// 1. User klickt auf Todo-Card
<Card onClick={() => onEditTodo(todo)}>
  {/* Todo-Inhalt */}
</Card>

// 2. Handler in MainTodos
const handleEditTodo = (todo: Todo) => {
  setTodoToEdit(todo);  // Speichere welches Todo
  setEditPopupOpen(true);  // Öffne Edit-Dialog
};

// 3. EditTodoPopUp mit Daten
<EditTodoPopUp
  open={editPopupOpen}
  initialData={todoToEdit}  // ← Vorausgefüllte Daten!
  onSubmit={(updates) => updateTodo(todoToEdit!.id, updates)}
/>

// 4. Hook updated Todo
const updateTodo = async (id: string, updates: Partial<Todo>) => {
  await updateTodoAxios(id, updates);  // Backend-Call
  
  // State aktualisieren (optimistisch)
  setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, ...updates } : todo
  ));
};
```

**Wichtig: `Partial<Todo>`**
```tsx
type Partial<Todo> = {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  // ... alle Felder optional
}
```
Bedeutet: Du musst nicht alle Felder übergeben, nur die die sich ändern!

#### DELETE - Todo löschen

```tsx
// 1. User klickt Delete-Button
<IconButton onClick={(e) => {
  e.stopPropagation();  // Verhindere Edit-Click
  handleDeleteClick(todo.id);
}}>
  <DeleteIcon />
</IconButton>

// 2. Handler öffnet Bestätigungs-Dialog
const handleDeleteClick = (todoId: string) => {
  setTodoToDelete(todoId);
  setDeleteDialogOpen(true);
};

// 3. User bestätigt
<Dialog open={deleteDialogOpen}>
  <DialogTitle>Todo wirklich löschen?</DialogTitle>
  <DialogActions>
    <Button onClick={handleDeleteCancel}>Abbrechen</Button>
    <Button onClick={handleDeleteConfirm}>Löschen</Button>
  </DialogActions>
</Dialog>

// 4. Löschen ausführen
const handleDeleteConfirm = () => {
  if (todoToDelete) {
    onDeleteTodo(todoToDelete);  // Prop-Funktion von MainTodos
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  }
};

// 5. useTodos Hook
const deleteTodo = async (id: string) => {
  await deleteTodoAxios(id);  // Backend
  setTodos(todos.filter(todo => todo.id !== id));  // Aus State entfernen
};
```

### 10.2 Status-Update (Drag & Drop zwischen Spalten)

```tsx
// 1. useTodoStatus Hook (für Status-Änderung)
const { handleMoveSelected } = useTodoStatus(
  todos,
  selectedTodos,
  clearSelection,
  async (todoId, newStatus) => {
    await onUpdateStatus(todoId, { status: newStatus });
  }
);

// 2. Button in jeder Spalte
<Button onClick={() => handleMoveSelected('TODO')}>
  Verschieben nach TODO
</Button>

// 3. handleMoveSelected Funktion
const handleMoveSelected = async (targetStatus: TodoStatus) => {
  for (const todoId of selectedTodos) {
    await onStatusChange(todoId, targetStatus);  // Callback
  }
  clearSelection();  // Checkboxen zurücksetzen
};

// 4. MainTodos passt onUpdateStatus
onUpdateStatus={async (id, updates) => {
  await updateTodo(id, updates);
}}

// 5. Backend-Call
export const updateTodoStatusAxios = async (id: string, status: TodoStatus) => {
  const user = await getCurrentUser();
  const response = await axiosClient.patch(`/todos/${id}/status`, {
    status,
    userId: user.userId
  });
  return response.data;
};
```

### 10.3 Filter-System

```tsx
// 1. Filter-State (useFilters Hook)
const [filters, setFilters] = useState<FilterState>({
  status: undefined,
  priority: undefined,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

// 2. Filter-UI
<TodoFilter filters={filters} onFiltersChange={updateFilters} />

// 3. Filter ändern
const updateFilters = (newFilters: Partial<FilterState>) => {
  setFilters({ ...filters, ...newFilters });
};

// 4. useEffect reagiert auf Filter-Änderung
useEffect(() => {
  refreshTodos(filters);  // Neu laden mit neuen Filtern
}, [filters]);

// 5. Backend erhält Filter als Query-Params
// GET /api/todos?status=TODO&priority=HIGH&search=React&sortBy=createdAt&sortOrder=desc
```

### 10.4 Search (Suche)

```tsx
// 1. SearchBar Component
<SearchBar onSearchChange={(search) => updateFilters({ search })} />

// 2. In SearchBar
<TextField
  placeholder="Suche..."
  onChange={(e) => onSearchChange(e.target.value)}
/>

// 3. Filter wird aktualisiert → useEffect triggert → refreshTodos()
```

### 10.5 Skeleton Loading (Lade-Animation)

```tsx
// Wenn loading=true, zeige Skeletons statt echter Todos
{loading ? (
  // Skeleton-Spalten
  <Paper>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="rectangular" height={100} />
    <Skeleton variant="rectangular" height={100} />
  </Paper>
) : (
  // Echte Todos
  todos.map(todo => <TodoCard todo={todo} />)
)}
```

---

## 11. Zusammenfassung: Der große Überblick

### Architektur-Ebenen:

```
┌─────────────────────────────────────────────────────────────┐
│                       APP.TSX (Root)                        │
│  • Theme Provider                                           │
│  • Auth-Check beim Start                                    │
│  • Routing (Login vs. MainTodos)                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    PAGES (Seitenebene)                      │
│  • logIn.tsx - Login/Register Seite                         │
│  • MainTodos.tsx - Haupt-Todo-Verwaltung                    │
│  → Kombinieren Components & Hooks                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENTS (UI-Bausteine)                  │
│  • NavigationBar - Header mit User-Info                     │
│  • TodoKanbanBoard - Kanban-Board mit 3 Spalten             │
│  • CreateTodoPopUp - Dialog zum Erstellen                   │
│  • EditTodoPopUp - Dialog zum Bearbeiten                    │
│  • FloatingActionButton - Plus-Button                       │
│  → Wiederverwendbare UI-Teile                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   HOOKS (Logik-Schicht)                     │
│  • useAuth - Login/Logout/Register                          │
│  • useTodos - CRUD-Operationen für Todos                    │
│  • useFilters - Filter-State-Management                     │
│  • useTodoForm - Formular-Handling                          │
│  → Wiederverwendbare Logik                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  SERVICES (API-Schicht)                     │
│  • authService - Backend-Calls für Auth                     │
│  • todoServices - Backend-Calls für Todos                   │
│  • todoFilterService - Gefilterte Todos laden               │
│  → HTTP-Kommunikation mit Backend                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                              │
│  • Express.js Server (Port 3001)                            │
│  • PostgreSQL Datenbank                                     │
│  • Session-Management                                       │
└─────────────────────────────────────────────────────────────┘
```

### Wichtigste Konzepte nochmal:

1. **Components = UI-Bausteine**
   - Kleine, wiederverwendbare Teile
   - Empfangen Props von außen
   - Haben eigenen State für UI-Logik

2. **Hooks = Wiederverwendbare Logik**
   - `useState` - State verwalten
   - `useEffect` - Seiteneffekte (API-Calls, etc.)
   - Custom Hooks - Eigene Logik kapseln

3. **Props = Daten von oben nach unten**
   - Eltern → Kind Kommunikation
   - Funktionen als Props für Kind → Eltern

4. **State = Gedächtnis der Komponente**
   - Wenn State sich ändert → Re-render
   - Jede Komponente kann eigenen State haben

5. **Services = Backend-Kommunikation**
   - Axios/Fetch für HTTP-Requests
   - Kapseln API-Logik

6. **Pages = Ganze Seiten**
   - Kombinieren Components
   - Verwalten Haupt-Logik

---

## 12. Deine Implementierungen im Detail

### Was DU hinzugefügt hast:

#### ✅ DELETE-Funktionalität
```
1. Delete-Button in TodoKanbanBoard
2. Bestätigungs-Dialog (Dialog Component)
3. State für Dialog (deleteDialogOpen, todoToDelete)
4. Handler (handleDeleteClick, handleDeleteConfirm)
5. deleteTodo in useTodos Hook
6. deleteTodoAxios in todoServices
```

#### ✅ EDIT-Funktionalität
```
1. Click-Handler auf TodoCard
2. EditTodoPopUp Component
3. initialData Prop Support in useTodoForm
4. State für Edit (editPopupOpen, todoToEdit)
5. updateTodo in useTodos Hook
6. updateTodoAxios in todoServices
```

#### ✅ STATUS-Update Persistenz
```
1. useTodoStatus Hook Callback
2. onUpdateStatus Prop in TodoKanbanBoard
3. Backend-Call in handleMoveSelected
4. updateTodoStatusAxios in todoServices
```

#### ✅ Session-Persistenz
```
1. checkAuthStatus Funktion in useAuth
2. useEffect in App.tsx beim Mount
3. getCurrentUser in authService
4. GET /auth/me Endpoint im Backend
```

#### ✅ Filter mit Auth
```
1. credentials: 'include' in fetch-Calls
2. TodoFilterService mit Session-Cookies
3. Query-Parameter Building
```

#### ✅ UI-Verbesserungen
```
1. FloatingActionButton Vereinfachung
2. Skeleton Loading für Kanban
3. Delete-Bestätigungs-Dialog
4. QuickFilter Entfernung
```

---

## 13. Debugging & Häufige Fehler

### Problem: Component rendert nicht neu

**Ursache:** State wird nicht richtig aktualisiert

```tsx
// ❌ FALSCH - Mutiert den Array direkt
todos.push(newTodo);
setTodos(todos);

// ✅ RICHTIG - Erstellt neuen Array
setTodos([...todos, newTodo]);
```

### Problem: Infinite Loop in useEffect

**Ursache:** Dependency Array fehlt oder falsch

```tsx
// ❌ FALSCH - Läuft bei jedem Render
useEffect(() => {
  refreshTodos();
});

// ✅ RICHTIG - Läuft nur beim Mount
useEffect(() => {
  refreshTodos();
}, []);

// ✅ RICHTIG - Läuft bei Filter-Änderung
useEffect(() => {
  refreshTodos();
}, [filters]);
```

### Problem: Props kommen nicht an

**Ursache:** Prop-Name stimmt nicht überein

```tsx
// Parent
<MyComponent userName="Max" />

// ❌ FALSCH
function MyComponent({ name }: Props) {  // userName != name

// ✅ RICHTIG
function MyComponent({ userName }: Props) {
```

### Problem: API-Call funktioniert nicht

**Ursache:** Credentials fehlen bei Session-Auth

```tsx
// ❌ FALSCH
await fetch(url);

// ✅ RICHTIG
await fetch(url, { credentials: 'include' });

// Oder mit Axios
const client = axios.create({
  withCredentials: true  // ← Wichtig!
});
```

---

## 14. Nächste Schritte zum Lernen

### Reihenfolge zum Vertiefen:

1. **React Basics vertiefen**
   - useState üben
   - useEffect verstehen
   - Props vs. State

2. **Eigene Components bauen**
   - Kleine UI-Teile extrahieren
   - Props definieren
   - Wiederverwendbarkeit

3. **Custom Hooks erstellen**
   - Logik aus Components extrahieren
   - useLocalStorage Hook
   - useDebounce Hook

4. **TypeScript verstehen**
   - Interfaces definieren
   - Type Safety
   - Generics

5. **Fortgeschrittene Patterns**
   - Context API (für globalen State)
   - useReducer (komplexerer State)
   - useMemo & useCallback (Performance)

### Übungen für dich:

1. **Erstelle einen "Sort"-Button**
   - Sortiere Todos nach Datum
   - Nutze State für Sort-Direction
   - Update Filter

2. **Füge "Due Date" hinzu**
   - Erweitere Todo-Interface
   - Datepicker in CreateTodoPopUp
   - Zeige Datum in TodoCard

3. **Baue eine "Archive"-Funktion**
   - Neuer Status "ARCHIVED"
   - Eigene Spalte oder ausblenden
   - Filter für archivierte Todos

4. **Implementiere Notifications**
   - Toast/Snackbar bei Erfolg
   - Fehlermeldungen schöner anzeigen
   - Undo-Funktion nach Delete

---

## Glossar

| Begriff | Erklärung |
|---------|-----------|
| **Component** | Wiederverwendbarer UI-Baustein (Funktion die JSX zurückgibt) |
| **Props** | Parameter die an Components übergeben werden |
| **State** | Daten die sich ändern können und Re-Render auslösen |
| **Hook** | Spezielle Funktion die React-Features nutzt (beginnt mit `use`) |
| **JSX** | JavaScript + XML - HTML in JavaScript schreiben |
| **Event Handler** | Funktion die auf User-Aktionen reagiert (onClick, onChange) |
| **Async/Await** | Warten auf asynchrone Operationen (z.B. API-Calls) |
| **API** | Application Programming Interface - Schnittstelle zum Backend |
| **CRUD** | Create, Read, Update, Delete - Standard-Operationen |
| **Session** | Server merkt sich dass User eingeloggt ist |
| **Cookie** | Kleiner Text im Browser zur Identifikation |
| **Axios** | HTTP-Client für API-Requests |
| **Material-UI** | UI-Komponenten Bibliothek (Buttons, Dialogs, etc.) |
| **TypeScript** | JavaScript mit Types - verhindert Fehler |
| **Interface** | Definiert Form von Objekten in TypeScript |

---

## Fazit

Du hast eine vollständige, moderne Web-App gebaut mit:

- ✅ React für UI
- ✅ TypeScript für Type-Safety
- ✅ Material-UI für schönes Design
- ✅ Session-basierter Authentication
- ✅ CRUD-Operationen
- ✅ Filter & Search
- ✅ Optimistic UI-Updates
- ✅ Loading States
- ✅ Error Handling

**Das ist beeindruckend!** 🎉

Die Konzepte die du hier gelernt hast, kannst du auf JEDE React-App anwenden. Der Aufbau (Components → Hooks → Services) ist ein professionelles Pattern.

Keep coding! 🚀
