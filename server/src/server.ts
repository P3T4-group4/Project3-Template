// server/src/server.ts
import express, { Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import db from './config/connection.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authenticateToken } from './utils/auth.js';

dotenv.config();

async function startServer() {
  // 1️⃣ Connect to MongoDB
  await db();
  console.log('✅ Database connected');

  // 2️⃣ Create & start ApolloServer
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // 3️⃣ Create Express app
  const app = express();
  const PORT = Number(process.env.PORT ?? 3001);

  // 4️⃣ Global middleware
  app.use(cors());
  app.use(bodyParser.json());

  // 5️⃣ Mount GraphQL endpoint
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }) => {
        // If no token or invalid, just return empty context
        try {
          const { user } = authenticateToken(req);
          return { user };
        } catch {
          return {};
        }
      },
    })
  );

  // 6️⃣ Serve React in production
  if (process.env.NODE_ENV === 'production') {
    const clientBuild = path.join(__dirname, '../client/dist');
    app.use(express.static(clientBuild));
    app.get('*', (_req: Request, res: Response) =>
      res.sendFile(path.join(clientBuild, 'index.html'))
    );
  }

  // 7️⃣ Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
