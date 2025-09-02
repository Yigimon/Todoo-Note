import { Request, Response } from 'express';
import { prisma } from '../index';

/*
 * TODO: NÄCHSTE SCHRITTE FÜR DEN TODO-CONTROLLER
 * 
 * 1. ✅ getAllTodos ist FERTIG implementiert
 * 2. ❌ createTodo muss noch richtig implementiert werden (Zeile 47)
 * 3. ❌ getTodoById muss implementiert werden
 * 4. ❌ updateTodo muss implementiert werden  
 * 5. ❌ deleteTodo muss implementiert werden
 * 6. ❌ getTodosByUser muss implementiert werden
 * 
 * WICHTIG: Diese Controller funktionieren noch nicht, weil:
 * - Die Routes sind nicht mit dem Server verbunden!
 * - Die Datenbank ist noch nicht erstellt (Migration fehlt)
 * 
 * REIHENFOLGE:
 * 1. Zuerst: Routes in src/index.ts einbinden
 * 2. Dann: Database Migration ausführen  
 * 3. Danach: Restliche Controller implementieren
 */
export class TodoController {
  // Alle Todos abrufen
  static async getAllTodos(req: Request, res: Response) {
    try {
      // 1. Alle Todos aus der Datenbank abrufen
      const todos = await prisma.todo.findMany({
        // 2. Zusätzlich User-Daten mit laden (JOIN)
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
              // password wird NICHT mit geladen (Sicherheit!)
            }
          }
        },
        // 3. Sortierung: Neueste zuerst
        orderBy: {
          createdAt: 'desc'
        }
      });

      // 4. Erfolgreiche Antwort mit allen Todos
      res.status(200).json({
        success: true,
        count: todos.length,
        data: todos
      });

    } catch (error) {
      // 5. Fehlerbehandlung
      console.error('Error fetching todos:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        message: 'Could not fetch todos'
      });
    }
  }

  // TODO: createTodo richtig implementieren!
  // PROBLEM: const todos = ... aber dann wird die alte Nachricht gesendet
  // LÖSUNG: Richtiges Response-Format wie in getAllTodos
  static async createTodo(req: Request, res: Response) {
    try {
      const todo = await prisma.todo.create({data: req.body})
      // TODO: Implementiere richtige Response:
      // res.status(201).json({
      //   success: true,
      //   message: `Todo '${todo.title}' created successfully`,
      //   data: todo
      // });
      res.json({ message: 'createTodo - noch nicht implementiert' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // TODO: getTodoById implementieren
  // BEISPIEL-CODE:
  // const { id } = req.params;
  // const todo = await prisma.todo.findUnique({ 
  //   where: { id },
  //   include: { user: { select: { id: true, name: true, email: true } } }
  // });
  // if (!todo) return res.status(404).json({ message: 'Todo not found' });
  // res.json({ success: true, data: todo });
  static async getTodoById(req: Request, res: Response) {
    try {
      // Implementierung kommt später
      res.json({ message: 'getTodoById - noch nicht implementiert' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Todo aktualisieren
  static async updateTodo(req: Request, res: Response) {
    try {
      // Implementierung kommt später
      res.json({ message: 'updateTodo - noch nicht implementiert' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Todo löschen
  static async deleteTodo(req: Request, res: Response) {
    try {
      // Implementierung kommt später
      res.json({ message: 'deleteTodo - noch nicht implementiert' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Alle Todos eines Users abrufen
  static async getTodosByUser(req: Request, res: Response) {
    try {
      // Implementierung kommt später
      res.json({ message: 'getTodosByUser - noch nicht implementiert' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
