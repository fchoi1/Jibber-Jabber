import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CHANNEL_ME } from '../utils/queries';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SearchBarUser from '../components/searchBarUser';
import './chats.css';

export default function Chats() {
  const loggedIn = Auth.loggedIn();

  //const [recentChats,setChats] = useState([])
  const { loading, data } = useQuery(QUERY_CHANNEL_ME);

  // useEffect(()=>{
  //     //console.log(search)
  //     if(data) {
  //         console.log("users found")
  //     }else{
  //         console.log("nothing found")
  //     }
  // })
  if (loading) return 'Loading...';
  //console.log(Auth.getProfile().data.username)
  const chats = data.channelMe;
  //   console.log(chats)
  const r = [];
  const rc = chats.map((c) => {
    let g = c._id;
    return c.users.filter((v) => {
      //console.log(v.username)
      if (v.username !== Auth.getProfile().data.username) {
        return r.push(v);
        //return v
      }
    });
  });

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
              console.log('channels: ', ch);
              return (
                <div className="chatBox">
                  <div className="headerContainer">
                    <h3>{ch.channelName}</h3>
                    <p className="created-at">Created on: {ch.createdAt}</p>
                  </div>
                  <p className="users">User(s): </p>
                  <Link
                    key={ch._id}
                    className="chatLink"
                    to={`/chat/${ch._id}`}
                  >
                    <div className="chatItemContainer">
                      <div className="chatItem">
                        {ch.users
                          .filter((v) => {
                            if (
                              v.username !== Auth.getProfile().data.username
                            ) {
                              return v.username;
                            }
                          })
                          .map((g) => {
                            //{console.log(ch._id)}
                            return <div key={g._id}>{g.username}</div>;
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
