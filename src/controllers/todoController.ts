import { Request, Response } from 'express';
import { prismaDbClient } from '../index';
import { ResponseHelper } from '../utils/responseHelper';
import { UserSelectHelper } from '../utils/databaseHelper';
import { TodoFilterQuery } from '../schemas/zod_index';

// Import types from organized files
import { TodoUpdateDbData } from '../types/database';
import { 
  GetAllTodosApiRes, 
  GetSingleTodoApiRes, 
  CreateTodoApiRes, 
  UpdateTodoApiRes, 
  DeleteTodoApiRes, 
  ApiErrorRes 
} from '../types/api';


export class TodoController {
  // Retrieve all todos with user data included + filtering
  static async getAllTodosWithUserData(req: Request, res: Response<GetAllTodosApiRes | ApiErrorRes>) {
    try {
      // Extract and validate query parameters
      const filters = req.query as unknown as TodoFilterQuery;
      
      // Build dynamic WHERE clause
      const whereClause = UserSelectHelper.buildTodoFilter(filters);
      
      // Build dynamic ORDER BY
      const orderBy = UserSelectHelper.buildTodoOrderBy(filters);
      
      // Build pagination
      const take = filters.limit ? Math.min(filters.limit, 100) : undefined; // Max 100
      const skip = filters.offset || undefined;

      const allTodosFromDb = await prismaDbClient.todo.findMany({
        where: whereClause,
        include: UserSelectHelper.CORE_USER_SELECT,
        orderBy: orderBy,
        take: take,
        skip: skip
      });

      ResponseHelper.send200(res, allTodosFromDb);
    } catch (dbError) {
      ResponseHelper.send500(res, 'Could not fetch todos', dbError);
    }
  }

  
  static async createNewTodoWithUser(req: Request, res: Response<CreateTodoApiRes | ApiErrorRes>) {
    try {
      const newTodoDataForDb = {
        title: req.body.title,
        description: req.body.description || null,
        userId: req.body.userId, 
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
        tags: req.body.tags || [],
        reminder: req.body.reminder ? new Date(req.body.reminder) : null,
      };

      const createdTodoFromDb = await prismaDbClient.todo.create({
        data: newTodoDataForDb,
        include: UserSelectHelper.CORE_USER_SELECT
      });

      ResponseHelper.send200(res, createdTodoFromDb, 201, `Todo '${createdTodoFromDb.title}' created successfully`);
    } catch (dbCreationError) {
      ResponseHelper.send500(res, 'Could not create todo', dbCreationError);
    }
  }

  static async getSingleTodoWithUser(req: Request, res: Response<GetSingleTodoApiRes | ApiErrorRes>) {
    try { 
      const { id: todoIdFromParams } = req.params;
      
      const singleTodoFromDb = await prismaDbClient.todo.findUnique({
        where: { id: todoIdFromParams },
        include: UserSelectHelper.CORE_USER_SELECT
      });
      
      if (!singleTodoFromDb) {
        return ResponseHelper.send404(res, "Todo not found");
      }
      
      ResponseHelper.send200(res, singleTodoFromDb);
    } catch (dbFetchError) {
      ResponseHelper.send500(res, 'Could not fetch todo', dbFetchError);
    }
  }


  static async updateExistingTodoWithUser(req: Request, res: Response<UpdateTodoApiRes | ApiErrorRes>) {
    try {
      const { id: todoIdToUpdate } = req.params;
      
      const existingTodoFromDb = await prismaDbClient.todo.findUnique({
        where: { id: todoIdToUpdate }
      });
      
      if (!existingTodoFromDb) {
        return ResponseHelper.send404(res, 'Todo not found');
      }

      const todoUpdateDataForDb: TodoUpdateDbData = {};
      if (req.body.title !== undefined) todoUpdateDataForDb.title = req.body.title;
      if (req.body.description !== undefined) todoUpdateDataForDb.description = req.body.description;
      if (req.body.status !== undefined) todoUpdateDataForDb.status = req.body.status;
      if (req.body.expiresAt !== undefined) todoUpdateDataForDb.expiresAt = req.body.expiresAt ? new Date(req.body.expiresAt) : null;
      if (req.body.tags !== undefined) todoUpdateDataForDb.tags = req.body.tags;
      if (req.body.reminder !== undefined) todoUpdateDataForDb.reminder = req.body.reminder ? new Date(req.body.reminder) : null;

      const updatedTodoFromDb = await prismaDbClient.todo.update({
        where: { id: todoIdToUpdate },
        data: todoUpdateDataForDb,
        include: UserSelectHelper.CORE_USER_SELECT
      });

      ResponseHelper.send200(res, updatedTodoFromDb, 200, `Todo '${updatedTodoFromDb.title}' updated successfully`);
    } catch (dbUpdateError) {
      ResponseHelper.send500(res, 'Could not update todo', dbUpdateError);
    }
  }


  static async deleteExistingTodoById(req: Request, res: Response<DeleteTodoApiRes | ApiErrorRes>) {
    try {
      const { id: todoIdToDelete } = req.params;

      const existingTodoFromDb = await prismaDbClient.todo.findUnique({
        where: { id: todoIdToDelete }
      });

      if (!existingTodoFromDb) {
        return ResponseHelper.send404(res, 'Todo not found');
      }

      await prismaDbClient.todo.delete({
        where: { id: todoIdToDelete }
      });

      ResponseHelper.send200(res, null, 200, `Todo '${existingTodoFromDb.title}' deleted successfully`);
    } catch (dbDeletionError) {
      ResponseHelper.send500(res, 'Could not delete todo', dbDeletionError);
    }
  }

  static async getTodosByUserWithUserData(req: Request, res: Response<GetAllTodosApiRes | ApiErrorRes>) {
    try {
      const { userId: targetUserIdFromParams } = req.params;

      const userFromDb = await prismaDbClient.user.findUnique({
        where: { id: targetUserIdFromParams }
      });

      if (!userFromDb) {
        return ResponseHelper.send404(res, 'User not found');
      }

      const userTodosFromDb = await prismaDbClient.todo.findMany({
        where: { userId: targetUserIdFromParams },
        include: UserSelectHelper.CORE_USER_SELECT,
        orderBy: { createdAt: 'desc' }
      });

      ResponseHelper.send200(res, userTodosFromDb);
    } catch (dbFetchUserTodosError) {
      ResponseHelper.send500(res, 'Could not fetch user todos', dbFetchUserTodosError);
    }
  }
}
