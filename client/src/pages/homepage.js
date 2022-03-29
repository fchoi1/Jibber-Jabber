import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  );
};

export default Homepage;
