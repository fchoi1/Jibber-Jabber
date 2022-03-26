// Imports
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  // Updates based on form input changes.
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const { data } = await Login({
        variables: { ...formState }
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    });
  };

  // Returns this layout on user/client request
  return (
    <div className="form-wrapper">
      <h2 className="signup-text">Login</h2>
      <form onSubmit={submitForm} className="signup-form">
        <div className="signup-form-div">
          <label htmlFor="username">Username</label>
          <input
            // {/* Client username input register */}
            className="form-input"
            name="username"
            type="username"
            id="username"
            value={formState.username}
            onChange={handleFormChange}
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
            onChange={handleFormChange}
          />
        </div>

        {/* Button! */}
        <div className="btn-link-div">
          <button className="signup-form-btn" type="submit">
            Login
          </button>
          <a className="login-link" href="/signup">
            Sign up instead!
          </a>
        </div>
      </form>
      {/* {error && <div>Sign up failed</div>} */}
    </div>
  );
};

// Exports our function for global use
export default Login;
