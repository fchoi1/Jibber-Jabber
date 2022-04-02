// Imports
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Mutation_Login } from '../../utils/mutations';
import Auth from '../../utils/auth'
import { validateEmail } from '../../utils/helpers';
import {Link} from 'react-router-dom'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const { email, password } = formState;
  const [errorMessage, setErrorMessage] = useState('');

  const [login, { error }] = useMutation(Mutation_Login);


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

    
      setFormState({
        ...formState,
        [name]: value
      });
      console.log(formState)
  };

  // Submit form
  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });
      //add token to localstorage
      Auth.login(data.login.token)
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
          
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleFormChange}
          />
        </div>

        

        <div className="signup-form-div">
          <input
            name="password"
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={handleFormChange}
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
          <Link className="login-link" to="/signup">Sign up instead</Link>
    
        </div>
      </form>
      {error && <div>Login failed</div>}
    </div>
  );
};

// Exports our function for global use
export default Login;
