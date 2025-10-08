import { Request, Response } from 'express';
import { prismaDbClient } from '../index';
import { ResponseHelper } from '../utils/responseHelper';
import bcrypt from 'bcryptjs';
import type * as ApiTypes from '../types/apiRes';

export class AuthController {
  // POST /auth/register - User Registration
  static async registerUser(req: Request, res: Response<ApiTypes.StandardApiRes | ApiTypes.ApiErrorRes>) {
    try {
      const { email, password, name } = req.body;
      
      // Check if user already exists
      const existingUser = await prismaDbClient.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return ResponseHelper.send500(res, 'User with this email already exists');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const newUser = await prismaDbClient.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      });
      
      ResponseHelper.send200(res, newUser, 201, 'User registered successfully');
    } catch (error) {
      ResponseHelper.send500(res, 'Registration failed', error);
    }
  }
  
  // POST /auth/login - User Login (handled by Passport)
  static async loginUser(req: Request, res: Response<ApiTypes.StandardApiRes | ApiTypes.ApiErrorRes>) {
    // This will be called after successful Passport authentication
    const user = req.user as any;
    
    // Explicitly save the session
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return ResponseHelper.send500(res, 'Login failed - session error', err);
      }
      
      ResponseHelper.send200(res, {
        id: user.id,
        email: user.email,
        name: user.name
      }, 200, 'Login successful');
    });
  }
  
  // POST /auth/logout - User Logout
  static async logoutUser(req: Request, res: Response<ApiTypes.StandardApiRes | ApiTypes.ApiErrorRes>) {
    try {
      req.logout((err) => {
        if (err) {
          return ResponseHelper.send500(res, 'Logout failed', err);
        }
        
        req.session.destroy((sessionErr) => {
          if (sessionErr) {
            return ResponseHelper.send500(res, 'Session destruction failed', sessionErr);
          }
          
          ResponseHelper.send200(res, null, 200, 'Logout successful');
        });
      });
    } catch (error) {
      ResponseHelper.send500(res, 'Logout failed', error);
    }
  }
  
  // GET /auth/me - Get Current User
  static async getCurrentUser(req: Request, res: Response<ApiTypes.StandardApiRes | ApiTypes.ApiErrorRes>) {
    try {
      if (!req.user) {
        return ResponseHelper.send500(res, 'Not authenticated');
      }
      
      const user = req.user as any;
      
      ResponseHelper.send200(res, {
        id: user.id,
        email: user.email,
        name: user.name
      }, 200, 'User data retrieved');
    } catch (error) {
      ResponseHelper.send500(res, 'Failed to get user data', error);
    }
  }
}