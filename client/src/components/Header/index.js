import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import image from '../../assets/jj(header).png';
import { useSocket } from '../../contexts/socket';

import './header.css';

const Header = () => {
  const socket = useSocket();
  console.log('header socket', socket);

  useEffect(() => {
    if (socket == null) return;
    socket.on('new-chat-in-channel', (channelId) => {
      console.log('someone sent a message to this channel: ', channelId);

      const channelNotif = JSON.parse(localStorage.getItem('channelNotif'));

      if (!channelNotif)
        localStorage.setItem('channelNotif', JSON.stringify([channelId]));
      else if (!channelNotif.includes(channelId)) {
        localStorage.setItem(
          'channelNotif',
          JSON.stringify([...channelNotif, channelId])
        );
      }
    });
    return () => socket.off('new-chat-in-channel');
  }, [socket]);

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
