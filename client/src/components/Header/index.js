import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import image from '../../assets/jj(header).png';

import './header.css';

const Header = () => {
  const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <img src={image} alt="headerimage" className="header-img"></img>
        <Link to="/" className="homepage-link">
          <h1>Jibber Jabber</h1>
        </Link>
      </div>

      <nav>
        {loggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
