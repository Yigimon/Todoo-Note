import { Response } from 'express';
import { ApiErrorRes } from '../types/api';

/**
 *Helper for diffrent response server status 
 */
export class ResponseHelper {
  
  /**
   * 500 - Server Error 
   */
  static send500(res: Response, message: string, error?: unknown): void {
    if (error) {
      console.error(`Error: ${message}:`, error);
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message
    } as ApiErrorRes);
  }

  /**
   * 404 - Not Found
   */
  static send404(res: Response, message: string): void {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message
    } as ApiErrorRes);
  }

  /**
   * 200/201 - Success Responses
   */
  static send200<T>(res: Response, data: T, status: number = 200, message?: string): void {
    const response = {
      success: true,
      ...(Array.isArray(data) && { count: data.length }),
      data,
      ...(message && { message })
    };
    
    res.status(status).json(response);
  }
}
