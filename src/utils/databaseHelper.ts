import { TodoFilterQuery } from '../types/requests';
import { Prisma } from '@prisma/client';

/**
 * Database helper for User selections and Todo filtering
 */
export class UserSelectHelper {

  static CORE_USER_SELECT = {
    user: {
      select: {
        id: true,
        name: true,
        email: true
      }
    }
  } as const;

  /**
   * Erweiterte Todo Filter - alle Optionen kombinierbar
   */
  static buildTodoFilter(filters: TodoFilterQuery): Prisma.TodoWhereInput {
    const whereClause: Prisma.TodoWhereInput = {};

    // Status Filter
    if (filters.status) {
      whereClause.status = filters.status;
    }

    // User Filter
    if (filters.userId) {
      whereClause.userId = filters.userId;
    }

    // Text Search
    if (filters.title) {
      whereClause.title = { contains: filters.title, mode: 'insensitive' };
    }

    if (filters.description) {
      whereClause.description = { contains: filters.description, mode: 'insensitive' };
    }

    // Kombinierte Suche in Titel UND Beschreibung
    if (filters.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    // Datum Filter (ISO Format: yyyy-mm-dd -> ganzer Tag)
    if (filters.createdAt) {
      const date = new Date(filters.createdAt);
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      
      whereClause.createdAt = { gte: startOfDay, lt: nextDay };
    }

    if (filters.expiresAt) {
      const date = new Date(filters.expiresAt);
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      
      whereClause.expiresAt = { gte: startOfDay, lt: nextDay };
    }

    // Tag Filter
    if (filters.hasTag) {
      whereClause.tags = {
        has: filters.hasTag  // Prisma: JSON Array enthält den Wert
      };
    }
    
    if (filters.tags) {
      const tagArray = filters.tags.split(',').map(tag => tag.trim());
      whereClause.tags = {
        hasEvery: tagArray  // Prisma: JSON Array enthält ALLE diese Werte
      };
    }

    return whereClause;
  }

  /**
   * Erweiterte Sortierung
   */
  static buildTodoOrderBy(filters: TodoFilterQuery): Prisma.TodoOrderByWithRelationInput {
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';

    return { [sortBy]: sortOrder };
  }
} 


