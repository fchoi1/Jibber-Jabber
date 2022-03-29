import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import auth from '../utils/auth';

const SERVER =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001/';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!auth.loggedIn()) {
      console.log('Not logged in');
      return children;
    }

    const id = auth.getProfile().data._id;
    const newSocket = io(SERVER, { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [children]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}