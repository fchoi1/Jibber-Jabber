import React from "react";
import Auth from "../utils/auth";
import Chats from "./Chats";
function Home(){
    
    if(Auth.loggedIn()){
        console.log("logged in")
        console.log(Auth.getProfile().data.email)
        console.log(Auth.getProfile().data._id)
        //console.log(searchedBooks)
      }else{
        console.log("need to log in")
      }
      
    return (
        <div>
           {Auth.loggedIn() ? <Chats/> : ""}
        </div>
    )
}

export default Home
