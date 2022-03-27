const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

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

const PORT = process.env.PORT || 3001;

// GraphQL server
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:authMiddleware
  });

  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQ at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../client/build')));
  });
}


db.once('open', () => {
  // app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  httpServer.listen({ port: process.env.PORT || 3001 }, () =>
    console.log(`Socket Server is running on ${PORT}`)
  );
});
