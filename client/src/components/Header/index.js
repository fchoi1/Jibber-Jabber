import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './header.css'

const Header = () => {
  const loggedIn = Auth.loggedIn();

  const logout = event =>{
      event.preventDefault();
      Auth.logout();
  }

  return (
    <header>
      <Link to="/">
        <h1>Jibber Jabber</h1>
      </Link>

      <nav>
        {loggedIn && (
            <>
          <Link to="/dashboard">Dashboard</Link> 
           <a href="/" onClick={logout}>Logout</a>
          </>
        ) }
      </nav>
    </header>
  );
};

export default Header;
