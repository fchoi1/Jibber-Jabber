import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_CHANNEL_ME } from '../utils/queries';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useSocket } from '../contexts/socket';
import { useNotifyContext } from '../contexts/notifContext';

import SearchBarUser from '../components/searchBarUser';
import './chats.css';

export default function Chats() {
  const { setchannelNotify } = useNotifyContext();
  const socket = useSocket(); //Socket context
  const loggedIn = Auth.loggedIn();

  const [chats, setChats] = useState([]);
  const [channelNotifications, setChannelNotifications] = useState([]);

  //const [recentChats,setChats] = useState([])
  const [getMyChannels, { loading, data }] = useLazyQuery(QUERY_CHANNEL_ME);

  useEffect(() => {
    const channelNotif = JSON.parse(localStorage.getItem('channelNotif'));
    if (channelNotif) setChannelNotifications(channelNotif);
  }, []);

  useEffect(() => {
    getMyChannels({
      onCompleted: (channelData) => {
        setChats(channelData.channelMe);
      }
    });
  }, [getMyChannels]);

  useEffect(() => {
    if (socket == null) return;
    socket.on('new-chat-in-channel', (channelId) => {
      console.log('new chats: ', channelId);

      const channelNotif = JSON.parse(localStorage.getItem('channelNotif'));

      if (!channelNotif) {
        localStorage.setItem('channelNotif', JSON.stringify([channelId]));
        setChannelNotifications([channelId]);
        setchannelNotify(true);
      } else if (!channelNotifications.includes(channelId)) {
        localStorage.setItem(
          'channelNotif',
          JSON.stringify([...channelNotif, channelId])
        );
        setChannelNotifications([...channelNotif, channelId]);
        setchannelNotify(true);
      }
    });

    return () => socket.off('new-chat-in-channel');
  }, [socket, setChannelNotifications, channelNotifications, setchannelNotify]);

  if (loading) return 'Loading...';
  //console.log(Auth.getProfile().data.username)
  // const chats = channelData?.channelMe;

  return (
    <div className="chatContainer">
      <h2>Welcome {Auth.getProfile().data.username}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBarUser chats={chats}></SearchBarUser>
      </div>
      <h4>Recent Chats:</h4>
      <div className="recentChats">
        {chats.length === 0
          ? 'No chats at the moment'
          : chats.map((ch) => {
              return (
                <div key={ch._id} className="chatBox">
                  <div className="headerContainer">
                    <p className="created-at">Created on: {ch.createdAt}</p>
                  </div>
                  {channelNotifications.includes(ch._id) && (
                    <div>There's a new Chat</div>
                  )}
                  <Link
                    key={ch._id}
                    className="chatLink"
                    to={`/chat/${ch._id}`}
                  >
                    <div className="chatItemContainer">
                      <div className="chatItem">
                        {ch.users.map((g) => {
                          //{console.log(ch._id)}
                          return g._id === Auth.getProfile().data._id ? (
                            <div key={g._id}> </div>
                          ) : (
                            <div key={g._id}>{g.username}</div>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
}
