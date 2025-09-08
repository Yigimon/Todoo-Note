import { TodoFilterQuery } from '../schemas/zod_index';
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
   * Erstellt Prisma WHERE-Klausel basierend auf Query-Parametern
   */
  static buildTodoFilter(filters: TodoFilterQuery): Prisma.TodoWhereInput {
    const whereClause: Prisma.TodoWhereInput = {};

    // Text-basierte Filter
    if (filters.title) {
      whereClause.title = { contains: filters.title, mode: 'insensitive' };
    }

    if (filters.description) {
      whereClause.description = { contains: filters.description, mode: 'insensitive' };
    }

    // Status Filter
    if (filters.status) {
      whereClause.status = filters.status;
    }

    // User Filter
    if (filters.userId) {
      whereClause.userId = filters.userId;
    }

    if (filters.userName) {
      whereClause.user = {
        name: { contains: filters.userName, mode: 'insensitive' }
      };
    }

    // Date Filter
    if (filters.expiresAfter || filters.expiresBefore) {
      whereClause.expiresAt = {};
      if (filters.expiresAfter) {
        whereClause.expiresAt.gte = new Date(filters.expiresAfter);
      }
      if (filters.expiresBefore) {
        whereClause.expiresAt.lte = new Date(filters.expiresBefore);
      }
    }

    if (filters.createdAfter || filters.createdBefore) {
      whereClause.createdAt = {};
      if (filters.createdAfter) {
        whereClause.createdAt.gte = new Date(filters.createdAfter);
      }
      if (filters.createdBefore) {
        whereClause.createdAt.lte = new Date(filters.createdBefore);
      }
    }

    // Tag Filter
    if (filters.tags) {
      const tagArray = filters.tags.split(',').map(tag => tag.trim());
      whereClause.tags = { hasSome: tagArray };
    }

    if (filters.hasTag) {
      whereClause.tags = { has: filters.hasTag };
    }

    return whereClause;
  }

  /**
   * Erstellt OrderBy für Sorting
   */
  static buildTodoOrderBy(filters: TodoFilterQuery): Prisma.TodoOrderByWithRelationInput {
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';

    if (sortBy === 'userName') {
      return { user: { name: sortOrder } };
    }

    return { [sortBy]: sortOrder };
  }
} 


