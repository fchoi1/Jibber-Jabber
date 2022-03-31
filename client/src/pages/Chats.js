import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_CHANNEL_ME } from '../utils/queries';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SearchBarUser from '../components/searchBarUser';
import './chats.css';

export default function Chats() {
  const loggedIn = Auth.loggedIn();

  const [chats, setChats] = useState([]);

  //const [recentChats,setChats] = useState([])
  const [getMyChannels, { loading, data: channelData }] =
    useLazyQuery(QUERY_CHANNEL_ME);

  useEffect(() => {
    getMyChannels({
      onCompleted: (channelData) => {
        setChats(channelData.channelMe);
      }
    });
  }, [getMyChannels]);
  if (loading) return 'Loading...';
  //console.log(Auth.getProfile().data.username)
  // const chats = channelData?.channelMe;

  console.log(chats);

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
