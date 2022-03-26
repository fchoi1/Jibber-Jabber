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

// CSS
import './App.css';

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
        <div id="page-container">
          <div id="content-wrap">
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
             <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path='/login' element ={ <Login/>}/>
            </Routes>
          </div>        
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
