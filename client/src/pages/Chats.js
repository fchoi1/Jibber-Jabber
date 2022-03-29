import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { Query_Me, QUERY_Users, Mutation_findUser } from '../utils/mutations';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Search from './SearchBar';
import './chats.css'


export default function Chats() {
  //const [recentChats,setChats] = useState([])
  const { loading, data } = useQuery(Query_Me);

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
  const chats = data.me.channelModel;
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

      <Search />
      <h4>Recent Chats:</h4>
      <div className="recentChats">
      
        {chats.length === 0
          ? 'No chats at the moment'
          : chats.map((ch) => {
            console.log("channels: ", ch)
              return (
                <div key={ch._id} className="chatItemContainer">
                <p className="created-at">Created on: {ch.createdAt}</p>
                <div key ={ch._id} className="chatItem">
                  {ch.users
                    .filter((v) => {
                       
                      if (v.username !== Auth.getProfile().data.username) {
                        return v.username;
                      }
                    })
                    .map((g) => {
                      //{console.log(ch._id)}
                      return (
                        <Link key={g._id} className="chatLink" to={`/chat/${ch._id}/${g._id}`}>
                          {g.username} 
                        </Link>
                        
                      );
                    })}
                </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
