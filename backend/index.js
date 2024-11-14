import express from 'express';
import http from 'http';
import cors from 'cors';

import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
// import connectMongo, { MongoDBStore } from 'connect-mongodb-session';


import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { buildContext } from 'graphql-passport';

import path from 'path';


// import mergedResolvers from './resolvers/index.js';
// import mergedTypeDefs from './typeDefs/index.js';

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connect } from 'http2';
import { connectDB } from './db/connectDB.js';

import connectMongo from 'connect-mongodb-session';

import { configurePassport } from './passport/passport.config.js';


const __dirname = path.resolve();


const app = express();

dotenv.config();
configurePassport();



const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

// const store = new MongoDBStore({
// 	uri: process.env.MONGO_URI,
// 	collection: "sessions",
// });


const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
  // Remove SSL options for testing
  options: {
      // ssl: true, // Commented out for testing
      // other options if needed
  }
});


// ERROR HANDLING
store.on("error-=-=-=-=-=-",(err) => console.log(err));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, // this option specifies whether to save the sesion to the store on every request
        saveUninitialized: false, // option specifies whether to save uninitialised sessions
        cookie:{
            maxAge: 1000*60*60*24*7,
            httpOnly: true, // prevents cross side scripting attack
        },
        store: store
        })
)

app.use(passport.initialize());
app.use(passport.session());



// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'frontend/dist/index.html');
    console.log('Serving static file for:', req.url); // Log the request URL
    console.log('File path:', filePath); // Log the file path being served

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving file:', err); // Log any errors
            res.status(err.status).end();
        }
    });
});


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
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
    //   context: async ({ req }) => ({ token: req.headers.token }),
      context: async ({ req,res }) => buildContext({ req,res }),
    }),
  );
  

  //RENDED.COm for deployment both backend and frontend under same domain


app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
app.get('*', (req, res) => {
    console.log('Serving static file for:', req.url);
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
  });




  // Modified server startup
  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  await connectDB();

  console.log(`🚀 Server ready at http://localhost:4000/`);


// console.log('server ready at',url)

