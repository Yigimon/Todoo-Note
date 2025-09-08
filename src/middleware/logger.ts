import { Request, Response, NextFunction } from 'express';

export const httpRequestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestStartTimestamp = Date.now();
  
  // Log incoming HTTP request
  console.log(`[${new Date().toISOString()}] INCOMING: ${req.method} ${req.path}`);
  
  // Log HTTP response when request is finished
  res.on('finish', () => {
    const requestDurationMs = Date.now() - requestStartTimestamp;
    console.log(
      `[${new Date().toISOString()}] COMPLETED: ${req.method} ${req.path} - Status:${res.statusCode} Duration:${requestDurationMs}ms`
    );
  });
  
  next();
};

export const errorLoggerMiddleware = (serverError: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${new Date().toISOString()} - Message: ${serverError.message}`);
  console.error(`[ERROR] Route: ${req.method} ${req.path}`);
  console.error(`[ERROR] Stack: ${serverError.stack}`);
  next(serverError);
};

//! TODO: Implement persistent logger with "winston" for production 