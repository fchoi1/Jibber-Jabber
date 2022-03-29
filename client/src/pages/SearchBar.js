import React from "react";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Mutation_findUser } from "../utils/mutations";
import { asyncMap } from "@apollo/client/utilities";

export default function Search(){

    const [search,setSearch] = useState("")
    const [findUser,{error}] = useMutation(Mutation_findUser)
    const findPeople = async (e)=>{
        e.preventDefault();
        try {
                    const response = await findUser({variables:search})
                    
                    if (!response.data.findUser) {
                        throw new Error('something went wrong!');
                    }else{
                        console.log("lets see")
                    }
                
                    } catch (err) {
                      console.error(err);
                      //setShowAlert(true);
                    }
    }
    return (
        <div className="p-3 text-center">
                <form onSubmit={findPeople}>
                    <input type="text" onChange={(e)=>{
                        setSearch(
                             e.target.value
                        ) 
                    }} value={search}  placeholder="Find new people..." />

                    <input type="submit" value="FIND" />
                </form>        
            </div>
    )
}