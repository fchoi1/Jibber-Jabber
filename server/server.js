// import express server
const express = require('express');

// import database connection
const db = require('./config/connection');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import authentication middleware
const { authMiddleware } = require('./utils/auth');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// Socket Server
const httpServer = require('http').createServer(app);
const socketio = require('socket.io');

// Attach socket.io to the server instance
const io = socketio(httpServer);

io.on('connection', (socket) => {
  console.log('A client connected', socket.id);
});

io.listen(httpServer);

// GraphQL server
const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // start the apollo sever
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQ at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize the apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  // app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  httpServer.listen({ port: process.env.PORT || 3001 }, () =>
    console.log(`Socket Server is running on ${PORT}`)
  );
});
