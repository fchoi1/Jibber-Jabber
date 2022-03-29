import React, { useEffect } from "react";
import {Row,Col,Form,Button,Alert} from 'react-bootstrap'
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Mutation_createChannel, Mutation_findUser, QUERY_Users } from "../utils/mutations";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

import { asyncMap } from "@apollo/client/utilities";

export default function Search(){

    const [search,setSearch] = useState("")
    //const [findUser,{error}] = useMutation(Mutation_findUser)
    const [findUser2,{error}] = useMutation(Mutation_findUser)
    const [createChannel,{error2}] = useMutation(Mutation_createChannel)
    const [userFound,setUserFound] = useState({})
    //console.log(error)
    const fff =  ["6240b7936414865e64ba7f58", "623de697a66c7cefc646277e"]
    const findPeople = async (e)=>{
        e.preventDefault();
        console.log(Auth.getProfile().data._id)
        //console.log(search)
        try {
                const response = await findUser2({variables:{email:search}})
                
                
                setUserFound(()=>{
                    return response.data.findUser
                })
                //create channel for the found user and loggedin user
                //console.log(userFound)
                const createdChannel = await createChannel({
                         variables:{
                             users: {...fff}
                            
                            }
                 })
                
                // Promise.all(createdChannel).then(console.log).catch(console.error)

                
                if (!response.data.findUser) {
                    throw new Error('something went wrong!');
                }else{
                    //console.log("lets see")
                }
                //console.log("looking for people")
            } catch (err) {
                      console.error(err);
                      //setShowAlert(true);
            }
    }
    return (
        <div className="p-3 text-center">
                <Form onSubmit={findPeople}>
                    <div>
                        <input type="text" required onChange={(e)=>{
                            setSearch(
                                e.target.value
                            ) 
                        }} value={search}  placeholder="Find new people..." />
                        <input type="submit" value="FIND" />
                        <div>
                            {/*show the results */}
                                <p className="border border-dark text-center">
                                <Link key={0} to={`/chat/?/${userFound._id}`}>{userFound.username}</Link>
                                </p>


                        </div>
                    </div>

                    
                </Form>        
            </div>
    )
}