import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Combine body, params, and query for validation
      const data = { ...req.body, ...req.params, ...req.query };
      
      const result = schema.safeParse(data);
      
      if (!result.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: result.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      
      // Attach validated data to request
      req.validatedData = result.data;
      next();
    } catch (error) {
      res.status(400).json({
        message: 'Validation error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
};

// Extend Express Request type to include validated data
declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
    }
  }
}
