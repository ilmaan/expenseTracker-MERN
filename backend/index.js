import express from 'express';
import http from 'http';
import cors from 'cors';

import dotenv from 'dotenv';


import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


// import mergedResolvers from './resolvers/index.js';
// import mergedTypeDefs from './typeDefs/index.js';

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connect } from 'http2';
import { connectDB } from './db/connectDB.js';

const app = express();

dotenv.config();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// const {url} = await startStandaloneServer(server);





// Ensure we wait for our server to start
await server.start();

// // Same ApolloServer initialization as before, plus the drain plugin
// // for our httpServer.
// const server = new ApolloServer<MyContext>({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });


// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
    //   context: async ({ req }) => ({ token: req.headers.token }),
      context: async ({ req }) => ({ req }),
    }),
  );
  
  // Modified server startup
  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  await connectDB();

  console.log(`🚀 Server ready at http://localhost:4000/`);


// console.log('server ready at',url)

