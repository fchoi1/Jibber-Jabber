import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_Users, Mutation_findUser } from "../utils/mutations";

import { QUERY_CHANNEL_ME } from "../utils/queries";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import Search from "./SearchBar";

import SearchBarUser from "../component/searchBarUser";

export default function Chats() {
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

  if (loading) return "Loading...";
  //console.log(Auth.getProfile().data.username)
  const chats = data?.channelMe;

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
    <div className="border border-dark p-4 m-2">
      <h2>Welcome {Auth.getProfile().data.username}</h2>
      <SearchBarUser chats={chats}></SearchBarUser>
      {/* <Search /> */}

      <div className="personalChat border border-dark">
        <h4>Recent Chats:</h4>
        {chats.length === 0
          ? "No chats at the moment"
          : chats.map((ch) => {
              return (
                <div key={ch._id} className="border border-dark p-3 m-1">
                  {ch.users
                    .filter((v) => {
                      if (v.username !== Auth.getProfile().data.username) {
                        return v.username;
                      }
                    })
                    .map((g) => {
                      //{console.log(ch._id)}
                      return (
                        <Link to={`/chat/${ch._id}/${g._id}`} key={g._id}>
                          {g.username}
                        </Link>
                      );
                    })}
                </div>
              );
            })}
      </div>
    </div>
  );
}
