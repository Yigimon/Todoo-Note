import { Status } from '@prisma/client';

export interface TodoUpdateDbData {
  title?: string;
  description?: string | null;
  status?: Status; 
  expiresAt?: Date | null;
  tags?: string[];
  reminder?: Date | null;
}


export interface TodoWithUserData {
  id: string;
  title: string;
  description: string | null;
  status: Status; 
  expiresAt: Date | null;
  tags: string[];
  remindAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}



