// Imports
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

// Main logic function
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form (notice the async!)
  const formSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  // Returns this layout based on user/client request
  return (
    <div className="form-wrapper">
      <h2 className="signup-text">Sign Up</h2>
      <form onSubmit={formSubmit} className="signup-form">
        <div className="signup-form-div">
          <label htmlFor="username">Username</label>
          <input
          // {/* Client username input register */}
          className="form-input"
          name="username"
          type="username"
          id="username"
          value={formState.username}
          onChange={handleChange}
        />
        </div>
    
        <div className="signup-form-div">
          <label htmlFor="email">Email</label>
          <input
          // {/* Client email input register */}
          className="form-input"
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
        </div>

        <div className="signup-form-div">
          <label htmlFor="password">Password</label>
          <input
          // {/* Client password input register */}
          className="form-input"
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
        />
        </div>

        {/* Button! */}
        <div className="btn-link-div">
        <button className="signup-form-btn" type="submit">
          Sign Up
        </button>
        <a className="login-link" href="/login">Login instead!</a>
        </div>
       
      </form>
      {error && <div>Sign up failed</div>}
    
    </div>
  );
};

// Export for full app use
export default Signup;
