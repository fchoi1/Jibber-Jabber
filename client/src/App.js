import './App.scss';
import {Container} from 'react-bootstrap'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from "./pages/Home"
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ApolloProvider,ApolloClient,InMemoryCache,createHttpLink
} from '@apollo/client';
import Nav from "./pages/Nav"
// for auth to create middleware
import { setContext } from '@apollo/client/link/context';
import NavBar from './pages/Nav';
import PC from './pages/PC';

let e_string = ""
if(process.env.NODE_ENV === "development"){
  e_string = "http://localhost:3001/graphql"
} else{
   e_string = "/graphql"
}
const httpLink = createHttpLink({ uri: e_string });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {

  
  return (
    <ApolloProvider client={client}>
      <Container className='p-5 '>
        
          <Router>
              <NavBar/>
              <Route path='/register' component={Register}/>
              <Route path='/login' component={Login}/>
              <Route exact path='/' component={Home}/>
              <Route path='/chat/:channelId/:friendId' component={PC}/>
          </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
