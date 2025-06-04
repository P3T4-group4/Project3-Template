// server/src/server.ts
import express, { Application, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import db from './config/connection';
import { typeDefs, resolvers } from './schemas';
import { authenticateToken } from './utils/auth';

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// “Application” must come from the same express that apollo-server-express uses under the hood.
const app: Application = express();

async function startApolloServer() {
  // 1. Connect to MongoDB
  await db();
  console.log('✅ Database connected');

  // 2. Create ApolloServer and pass context via authenticateToken
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: Request }) => {
      // Extract and verify JWT from “Authorization” header (if present)
      const user = authenticateToken(req);
      return { user };
    },
  });
  await server.start();

  // 3. CORS must be registered BEFORE applyMiddleware
  app.use(
    cors({
      origin: 'http://localhost:5173',  // <– exactly your Vite front‐end origin
      credentials: true,
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(bodyParser.json());

  // 4. If in production, serve the React build output
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  // 5. Attach Apollo middleware onto Express
  server.applyMiddleware({
    app: app as any,      // “as any” to avoid Express “Application” mismatch
    path: '/graphql',
  });

  // 6. In production, let React Router handle front‐end routes
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
  }

  // 7. Finally, listen
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer().catch((err) => {
  console.error('Error starting server:', err);
});
