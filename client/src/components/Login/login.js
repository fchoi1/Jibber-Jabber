// Imports
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import { validateEmail } from '../../utils/helpers';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const { email, password } = formState;
  const [errorMessage, setErrorMessage] = useState('');

  const [login, { error }] = useMutation(LOGIN_USER);


  // Updates based on form input changes.
  const handleFormChange = (event) => {
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
        setErrorMessage(`${name} is required!`);
      } else {
        setErrorMessage('');
      }
    }

    if (!errorMessage) {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
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
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            defaultValue={email}
            onBlur={handleFormChange}
          />
        </div>

        <div className="signup-form-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            defaultValue={password}
            onBlur={handleFormChange}
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
