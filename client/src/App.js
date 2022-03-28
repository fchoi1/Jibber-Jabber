import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import WelcomePage from './components/WelcomePage'

// CSS
import './App.css';
import Channel from './pages/Channel';

// Sign up and Login
import Signup from './components/Signup/signup'
import Login from './components/Login/login'

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
        <div id="page-container" className='mainSection' >
        <Header />
          <div id="content-wrap" >
            <Routes>
              <Route exact path="/" component={WelcomePage}></Route>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/channel" component={Channel} />
              <Route exact path="/signup" component={Signup}/>
              <Route exact path='/login' component ={ Login}/>
            </Routes>
          </div>        
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
