import socketio from 'socket.io-client';
import React from 'react';

const SERVER =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001/';

export const socket = socketio.connect(SERVER);
export const SocketContext = React.createContext();
