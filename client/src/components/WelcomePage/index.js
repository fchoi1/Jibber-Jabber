import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

import './welcomepage.css';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

export default function WelcomePage() {
  const loggedIn = Auth.loggedIn();

  const { loading, data } = useQuery(QUERY_ME);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="welcome-div">
      <h1>Welcome</h1>
      {loggedIn && data ? <h2>{data.me.username}</h2> : null}
      <button>
        {loggedIn ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/signup">Get Started</Link>
        )}
      </button>
    </div>
  );
}
