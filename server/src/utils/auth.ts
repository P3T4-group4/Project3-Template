// server/src/utils/auth.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from 'apollo-server-express';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'dev-secret';

// Generate a JWT signed token for a user
export const signToken = (name: string, email: string, _id: string): string => {
  const payload = { name, email, _id };
  return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '2h' });
};

// Middleware to get user from JWT in Authorization header
interface ContextUser {
  _id: string;
  name: string;
  email: string;
}

export const authenticateToken = (req: any): ContextUser | null => {
  const authHeader = req.headers.authorization || '';
  // Expect header: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    // Payload is under .data
    return decoded.data as ContextUser;
  } catch (err) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};
