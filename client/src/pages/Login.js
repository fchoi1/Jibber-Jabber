import React from "react";
import {Row,Col,Form,Button,Alert} from 'react-bootstrap'
import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from "@apollo/client";
import { Mutation_Login } from "../utils/mutations"; 

export default function Login(){
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
    //const {loading,data,error} = useQuery(QUERY_Users)
    const [loginUser,{error}] = useMutation(Mutation_Login)
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
   
    const handleFormSubmit2 = async(e)=>{
  
      e.preventDefault();
      try {
       const response = await loginUser({variables:userFormData})
       
       if (!response.data.login) {
           throw new Error('something went wrong!');
       }
   
         const { token, user } = response.data.login;
         console.log(user);
         Auth.login(token);
       } catch (err) {
         console.error(err);
         setShowAlert(true);
       }
   
       setUserFormData({
         email: '',
         password: '',
       });
 
   }
    
    return(
        

        < >
        <h2>Login</h2>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit2}>
          {/* show alert if server response is bad */}
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
          </Alert>
  
  
          <Form.Group>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Your email address'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submite
          </Button>
        </Form>
        {error && <div>Login failed</div>}
      </>
      )
}