import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { Query_Channel, Query_Me, QUERY_Users } from "../utils/mutations";
import {Row,Col,Form,Button,Alert} from 'react-bootstrap'
import {Mutation_SendMessage} from "../utils/mutations"
import { setContext } from "@apollo/client/link/context";
import { useParams, BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function PC(){
  
    const {channelId,friendId} = useParams()
    console.log(channelId,friendId)
    const senderId = Auth.getProfile().data._id

    const {loading,data,refetch} = useQuery(Query_Channel,{
        variables:{id:channelId}
    }) 
    
    setInterval(()=>{
        //console.log("working")
        refetch()
    },2000)
    
    const [msg,setMessage] = useState("")
    const [sendNow,{error} ]=  useMutation(Mutation_SendMessage);
    const userFormData = {
        id: channelId,
        textValue: msg,
        senderId:{_id:senderId}
    }
    async function sendMessage(e){
        e.preventDefault()
        console.log(msg)

        //we can send the message now
        try {
            const response = await sendNow({variables:userFormData})
            
            if (!response.data.login) {
                throw new Error('something went wrong!');
            }
        
            } catch (err) {
              console.error(err);
              //setShowAlert(true);
            }



        //set the msg back to " "
        setMessage("")

    }

    if(data){
        console.log(data.channel.messages)
    }
    return (
        <div className="border border-dark m-4 ">
            {
                data ? data.channel.messages.map(msg=>{
                    if(msg.sender._id === senderId) return <p className="border m-3" style={{textAlign:"right"}}>{msg.textValue}</p>
                    else return(
                        <p className="border m-3" style={{textAlign:"left"}}>{msg.textValue}</p>
                    )
                }) : "Loading"
            }
        


            <div className="p-3 " style={{textAlign:"right"}}>
                <Form onSubmit={sendMessage}>
                    <input type="text" onChange={(e)=>{
                        setMessage(e.target.value) 
                    }} value={msg} placeholder="Your message..." />
                    <input type="submit"  />
                </Form>        
            </div>
        </div>
    )

}