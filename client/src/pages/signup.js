// Imports
import React, { useState } from 'react';

import { validateEmail } from '../utils/helpers';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import auth from '../utils/auth';

// Main logic function
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formState;
  const [addUser, { error }] = useMutation(ADD_USER);

  const [errorMessage, setErrorMessage] = useState('');

  // update state based on form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'email') {
      const isValid = validateEmail(value);
      if (!isValid) {
        setErrorMessage('Your email is invalid!');
      } else {
        setErrorMessage('');
      }
    } else {
      if (!value.length) {
        setErrorMessage(`${name} is required.`);
      } else {
        setErrorMessage('');
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [name]: value });
    }
  }

  // submit form (notice the async!)
  const formSubmit = async (event) => {
    event.preventDefault();

    // make sure the form inputs are valid before adding user
    if (!errorMessage) {
      // use try/catch instead of promises to handle errors
      try {
        // execute addUser mutation and pass in variable data from form
        console.log(formState);
        const { data } = await addUser({
          variables: { ...formState }
        });
        console.log(data);
        auth.login(data.addUser.token); //redirects to login
      } catch (e) {
        console.error(e);
      }
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
            defaultValue={username}
            onBlur={handleChange}
          />
        </div>

        <div className="signup-form-div">
          <label htmlFor="email">Email</label>
          <input
            // {/* Client email input register */}

            name="email"
            type="email"
            id="email"
            defaultValue={email}
            onBlur={handleChange}
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
            defaultValue={password}
            onBlur={handleChange}
            minLength="4"
          />
        </div>

        {errorMessage && (
          <div>
            <p className="err">{errorMessage}</p>
          </div>
        )}

        {/* Button! */}
        <div className="btn-link-div">
          <button className="signup-form-btn" type="submit">
            Sign Up
          </button>
          <a className="login-link" href="/login">
            Login instead!
          </a>
        </div>
      </form>
      {error && <div>Sign up failed</div>}
    </div>
  );
};

// Export for full app use
export default Signup;
