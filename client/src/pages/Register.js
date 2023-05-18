import React from "react";
import {Row,Col,Form,Button,Alert} from 'react-bootstrap'
import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_Users,Mutation_signup } from "../utils/mutations"; 
import { propTypes } from "react-bootstrap/esm/Image";

export default function Register(props){
   // set initial form state
   const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
   // set state for form validation
   const [validated] = useState(false);
   // set state for alert
   const [showAlert, setShowAlert] = useState(false);
   //const {loading,data,error} = useQuery(QUERY_Users)
   const [signupUser,{error}] = useMutation(Mutation_signup)
   const handleInputChange = (event) => {
     const { name, value } = event.target;
     setUserFormData({ ...userFormData, [name]: value });
   };
 
  
   const handleFormSubmit2 = async(e)=>{
 
     e.preventDefault();
     try {
      const response = await signupUser({variables:userFormData})
      if (!response.data.addUser) {
          throw new Error('something went wrong!');
      }
  
        const { token } = response.data.addUser;
        Auth.login(token);
      } catch (err) {
        setShowAlert(true);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });

  }
    
    return(
      <>
      <h2>REGISTER</h2>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit2}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

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
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submite
        </Button>
      </Form>
      {error && <div>Login failed</div>}
    </>
    )
}