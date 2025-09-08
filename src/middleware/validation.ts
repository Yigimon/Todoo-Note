import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (zodValidationSchema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Combine body, params, and query data for validation
      const requestDataToValidate = { ...req.body, ...req.params, ...req.query };
      
      const validationResult = zodValidationSchema.safeParse(requestDataToValidate);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: 'Request validation failed',
          errors: validationResult.error.errors.map(validationErr => ({
            field: validationErr.path.join('.'),
            message: validationErr.message,
          })),
        });
      }
      
      // Attach validated data to request for controllers
      req.validatedReqData = validationResult.data;
      next();
    } catch (validationProcessError) {
      res.status(400).json({
        success: false,
        message: 'Validation processing error',
        error: validationProcessError instanceof Error ? validationProcessError.message : 'Unknown validation error',
      });
    }
  };
};

// Extend Express Request type to include validated data
declare global {
  namespace Express {
    interface Request {
      validatedReqData?: any;
    }
  }
}
