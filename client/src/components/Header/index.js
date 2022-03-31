import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import image from '../../assets/jj(header).png';
import { useSocket } from '../../contexts/socket';
import { useNotifyContext } from '../../contexts/notifContext';
import './header.css';

const Header = () => {
  const socket = useSocket(); //Socket context
  console.log('header socket id', socket?.id);
  const { channelNotify, setchannelNotify } = useNotifyContext();
  console.log('context channel', channelNotify);

  const channelNotif = JSON.parse(localStorage.getItem('channelNotif'));

  useEffect(() => {
    if (!channelNotif) setchannelNotify(false);
    if (channelNotif.length > 0) setchannelNotify(true);
  });

  // const [channelNotify, setchannelNotify] = useState(false);

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
      {channelNotify && <div>New Un-read chats!</div>}
    </header>
  );
};

export default Header;
