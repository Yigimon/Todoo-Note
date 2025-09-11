import { Response } from 'express';
import { ApiErrorRes } from '../types/apiRes';

/**
 * Helper for different response server status 
 */
export class ResponseHelper {
  
  /**
   * Generic response method
   */
  static sendResponse<T>(
    res: Response, 
    status: number, 
    data?: T, 
    message?: string, 
    error?: string
  ): void {
    const isError = status >= 400;
    
    if (isError && error) {
      console.error(`Error: ${message}:`, error);
    }

    const response = {
      success: !isError,
      ...(data !== null && data !== undefined && { data }),
      ...(Array.isArray(data) && { count: data.length }),
      ...(message && { message }),
      ...(isError && { error: error || 'An error occurred' })
    };

    res.status(status).json(response);
  }

  /**
   * error messages 
   */
  static send500(res: Response, message: string, error?: unknown): void {
    this.sendResponse(res, 500, null, message, 'Internal server error');
  }

  static send404(res: Response, message: string): void {
    this.sendResponse(res, 404, null, message, 'Not Found');
  }

  static send200<T>(res: Response, data: T, status: number = 200, message?: string): void {
    this.sendResponse(res, status, data, message);
  }
}
