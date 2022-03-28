import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

// for auth to create middleware
import { setContext } from '@apollo/client/link/context';

// Components and Pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Homepage from './pages/homepage';
// Sign up and Login

import Signup from './pages/signup';
import Login from './pages/login';

// CSS
import './App.css';
import Channel from './pages/Channel';

// Socket IO
// import { SocketContext, socket } from './context/socket';
import { SocketProvider } from './contexts/socket';

import auth from './utils/auth';

// Apollo client stuff
const httpLink = createHttpLink({ uri: '/graphql' });
// dont need to use first argument of setContext (request)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="page-container" className="mainSection">
          <div id="content-wrap">
            <Header />
            <SocketProvider>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={auth.loggedIn() ? <Home /> : <Homepage />}
                />
                )
                <Route exact path="/channel" element={<Channel />} />
                <Route path="*" element={<div>Page not Found</div>} />
                {/* <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </SocketProvider>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
