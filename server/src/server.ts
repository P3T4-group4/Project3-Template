// server/src/server.ts
import express, { Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import db from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

dotenv.config();

async function startApolloServer() {
  // 1. Connect to MongoDB
  await db();
  console.log('✅ Database connected');

  // 2. Start ApolloServer
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // 3. Create Express app
  const app = express();
  const PORT = parseInt(process.env.PORT || '3001', 10);

  // 4. Mount /graphql with CORS & body parsing
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }) => {
        // authenticateToken should read the token from headers
        const user = await authenticateToken(req);
        return { user };
      },
    })
  );

  // 5. Serve React build in production
  if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../client/dist');
    app.use(express.static(clientBuildPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }

  // 6. Start HTTP server
  app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
