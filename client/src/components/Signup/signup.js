// Imports
import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers';

import { useMutation } from '@apollo/client';
import { Mutation_signup } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

// Main logic function
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formState;
  const [addUser, { error }] = useMutation(Mutation_signup);

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

    setFormState({ ...formState, [name]: value });
  }

  // submit form (notice the async!)
  const formSubmit = async (event) => {
    event.preventDefault();

    // make sure the form inputs are valid before adding user
    if (!errorMessage) {
      // use try/catch instead of promises to handle errors
      try {
        // execute addUser mutation and pass in variable data from form
        const { data } = await addUser({
          variables: { ...formState }
        });
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }

      // clear form values
      setFormState({
        username: '',
        email: '',
        password: ''
      });
    }
  };

  // Returns this layout based on user/client request
  return (
    <div className="form-wrapper">
      <h2 className="signup-text">Sign Up</h2>
      <form onSubmit={formSubmit} className="signup-form">
        <div className="signup-form-div">
          <input
            // {/* Client username input register */}
            className="form-input"
            name="username"
            type="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            minLength="4"
          />
        </div>

        <div className="signup-form-div">
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="signup-form-div">
          <input
            // {/* Client password input register */}
            className="form-input"
            name="password"
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={handleChange}
            minLength="4"
          />
        </div>

        {errorMessage && (
          <div>
            <p className="err">{errorMessage}</p>
          </div>
        )}

        <div className="btn-link-div">
          <button className="signup-form-btn" type="submit">
            Sign Up
          </button>
          <Link className="login-link" to="/login">
            Login instead
          </Link>
        </div>
      </form>
      {error && <div>Sign up failed</div>}
    </div>
  );
};

// Export for full app use
export default Signup;
