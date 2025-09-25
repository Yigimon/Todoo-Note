import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../utils/responseHelper';


 //Middleware to check if user is authenticated

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  
  return ResponseHelper.send500(res, 'Authentication required. Please login first.');
};


// check NOT authenticated (for login/register routes)
 
export const requireNoAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return ResponseHelper.send500(res, 'Already authenticated. Please logout first.');
  }
  
  return next();
};


// Middleware to optionally authenticate (for routes that work with/without auth)

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  // Always proceed, but req.user will be available if authenticated
  return next();
};