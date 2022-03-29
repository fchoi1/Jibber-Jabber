import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

import './welcomepage.css';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

export default function WelcomePage() {
  const loggedIn = Auth.loggedIn();
  console.log('Logged in: ', loggedIn);

  const { loading, data } = useQuery(QUERY_ME);
  console.log('User Data: ', data);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="welcome-div">
      <h1>Welcome</h1>
      {loggedIn && data ? <h1>{data.me.username}</h1> : null}
      <button>
        {loggedIn ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/signup">Signup / Login</Link>
        )}
      </button>
    </div>
  );
}
