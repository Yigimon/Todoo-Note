import { Request, Response } from 'express';
import { prisma } from '../index';

/*
 * ✅ CONTROLLER STATUS - ALLE FERTIG IMPLEMENTIERT!
 * 
 * 1. ✅ getAllTodos ist FERTIG implementiert
 * 2. ✅ createTodo ist FERTIG implementiert  
 * 3. ✅ getTodoById ist FERTIG implementiert
 * 4. ✅ updateTodo ist FERTIG implementiert  
 * 5. ✅ deleteTodo ist FERTIG implementiert
 * 6. ✅ getTodosByUser ist FERTIG implementiert
 * 
 * ✅ Routes sind mit dem Server verbunden!
 * ❌ Die Datenbank muss noch erstellt werden (Migration fehlt)
 * 
 * NÄCHSTER SCHRITT:
 * 1. Database Migration ausführen: pnpm prisma:migrate
 * 2. Testen mit: GET http://localhost:3000/api/todos
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
              // ohne Passwort für Sicherheit
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

  // ✅ createTodo - FERTIG implementiert
  static async createTodo(req: Request, res: Response) {
    try {
      // 1. Validierte Daten aus Request body verwenden
      const todoData = {
        title: req.body.title,
        description: req.body.description || null,
        userId: req.body.userId, // WICHTIG: UserId muss mitgesendet werden
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
        tags: req.body.tags || [],
        reminder: req.body.reminder ? new Date(req.body.reminder) : null,
      };

      // 2. Todo in Datenbank erstellen
      const todo = await prisma.todo.create({
        data: todoData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // 3. Erfolgreiche Response
      res.status(201).json({
        success: true,
        message: `Todo '${todo.title}' created successfully`,
        data: todo
      });

    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Could not create todo'
      });
    }
  }

 
  static async getTodoById(req: Request, res: Response) {
    try { const {id} = req.params;
    const todo = await prisma.todo.findUnique({
      where : {id},
      include : { user: 
        {
          select:
           {
             id: true, name: true, email: true
            }
          }
        }
    });
    if (!todo)return res.status(404).json({message: "Todo not found"});
    res.json({success: true, data: todo});    
     
    }
     catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  // ✅ updateTodo - FERTIG implementiert
  static async updateTodo(req: Request, res: Response) {
    try {
      // 1. ID aus URL-Parameter
      const { id } = req.params;
      
      // 2. Prüfen ob Todo existiert
      const existingTodo = await prisma.todo.findUnique({
        where: { id }
      });
      
      if (!existingTodo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      // 3. Update-Daten vorbereiten (nur geänderte Felder)
      const updateData: any = {};
      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.status !== undefined) updateData.status = req.body.status;
      if (req.body.expiresAt !== undefined) updateData.expiresAt = req.body.expiresAt ? new Date(req.body.expiresAt) : null;
      if (req.body.tags !== undefined) updateData.tags = req.body.tags;
      if (req.body.reminder !== undefined) updateData.reminder = req.body.reminder ? new Date(req.body.reminder) : null;

      // 4. Todo aktualisieren
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // 5. Erfolgreiche Response
      res.status(200).json({
        success: true,
        message: `Todo '${updatedTodo.title}' updated successfully`,
        data: updatedTodo
      });

    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Could not update todo'
      });
    }
  }

  // ✅ deleteTodo - FERTIG implementiert
  static async deleteTodo(req: Request, res: Response) {
    try {
      // 1. ID aus URL-Parameter
      const { id } = req.params;

      // 2. Prüfen ob Todo existiert
      const existingTodo = await prisma.todo.findUnique({
        where: { id }
      });

      if (!existingTodo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      // 3. Todo löschen
      await prisma.todo.delete({
        where: { id }
      });

      // 4. Erfolgreiche Response
      res.status(200).json({
        success: true,
        message: `Todo '${existingTodo.title}' deleted successfully`
      });

    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Could not delete todo'
      });
    }
  }

  // ✅ getTodosByUser - FERTIG implementiert
  static async getTodosByUser(req: Request, res: Response) {
    try {
      // 1. userId aus URL-Parameter
      const { userId } = req.params;

      // 2. Prüfen ob User existiert
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // 3. Alle Todos des Users abrufen
      const todos = await prisma.todo.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // 4. Erfolgreiche Response
      res.status(200).json({
        success: true,
        count: todos.length,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        data: todos
      });

    } catch (error) {
      console.error('Error fetching todos by user:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Could not fetch user todos'
      });
    }
  }
}
