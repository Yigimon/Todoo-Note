import { Request, Response } from 'express';
import { prismaDbClient } from '../index';
import { ResponseHelper } from '../utils/responseHelper';
import { UserSelectHelper } from '../utils/databaseHelper';

// Grouped type imports
import type { TodoFilterQuery } from '../types/requests';
import type { TodoUpdateDbData } from '../types/database';
import type * as ApiTypes from '../types/apiRes';


export class TodoController {
  // Retrieve all todos with basic filtering
  static async getAllTodosWithUserData(req: Request, res: Response<ApiTypes.GetAllTodosApiRes | ApiTypes.ApiErrorRes>) {
    try {
      // query parameters
      const filters = req.query as unknown as TodoFilterQuery;
      
      // Build basic WHERE clause
      const whereClause = UserSelectHelper.buildTodoFilter(filters);
      
      // Build basic ORDER BY
      const orderBy = UserSelectHelper.buildTodoOrderBy(filters);

      const allTodosFromDb = await prismaDbClient.todo.findMany({
        where: whereClause,
        include: UserSelectHelper.CORE_USER_SELECT,
        orderBy: orderBy
      });

      ResponseHelper.send200(res, allTodosFromDb);
    } catch (dbError) {
      ResponseHelper.send500(res, 'Could not fetch todos', dbError);
    }
  }

  
  static async createNewTodoWithUser(req: Request, res: Response<ApiTypes.CreateTodoApiRes | ApiTypes.ApiErrorRes>) {
    try {
      const newTodoDataForDb = {
        title: req.body.title,
        description: req.body.description || null,
        userId: req.body.userId, 
        priority: req.body.priority || 'MEDIUM',
        expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : null,
        tags: req.body.tags || [],
        remindAt: req.body.remindAt ? new Date(req.body.remindAt) : null,
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

  static async getSingleTodoWithUser(req: Request, res: Response<ApiTypes.GetSingleTodoApiRes | ApiTypes.ApiErrorRes>) {
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


  static async updateExistingTodoWithUser(req: Request, res: Response<ApiTypes.UpdateTodoApiRes | ApiTypes.ApiErrorRes>) {
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
      if (req.body.priority !== undefined) todoUpdateDataForDb.priority = req.body.priority;
      if (req.body.expiresAt !== undefined) todoUpdateDataForDb.expiresAt = req.body.expiresAt ? new Date(req.body.expiresAt) : null;
      if (req.body.tags !== undefined) todoUpdateDataForDb.tags = req.body.tags;
      if (req.body.remindAt !== undefined) todoUpdateDataForDb.remindAt = req.body.remindAt ? new Date(req.body.remindAt) : null;

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


  static async deleteExistingTodoById(req: Request, res: Response<ApiTypes.DeleteTodoApiRes | ApiTypes.ApiErrorRes>) {
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
}
