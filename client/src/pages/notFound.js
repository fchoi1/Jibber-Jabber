import React from 'react';
import { Navigate } from 'react-router-dom';

function NotFound(props) {
  //   return <div>Page Not Found</div>;
  return <Navigate to="/" />;
}

export default NotFound;
