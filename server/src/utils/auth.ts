// server/src/utils/auth.ts
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthenticationError } from '@apollo/server';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';
const EXPIRATION = '2h';

// Shape of what we embed in the JWT
export interface Payload {
  _id: string;
  name: string;
  email: string;
}

// Shape of what we return into Apollo’s context
export interface AuthContext {
  user?: Payload;
}

/**
 * Sign a JWT for a given profile payload.
 */
export function signToken(payload: Payload): string {
  return jwt.sign({ data: payload }, SECRET_KEY, {
    expiresIn: EXPIRATION,
  });
}

/**
 * Extracts and verifies a JWT from the Authorization header.
 * Returns `{ user }` if valid, otherwise throws AuthenticationError.
 */
export function authenticateToken(req: Request): AuthContext {
  const authHeader = req.headers.authorization ?? '';
  // Expect “Bearer ‹token›”
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!token) {
    throw new AuthenticationError('No token provided, authorization denied');
  }

  try {
    const { data } = jwt.verify(token, SECRET_KEY) as any;
    return { user: data as Payload };
  } catch {
    throw new AuthenticationError('Invalid or expired token');
  }
}
