// Imports
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

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
    <main>
      <div>
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={formSubmit}>
              <input
                // {/* Client username input register */}
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                // {/* Client email input register */}
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                // {/* Client password input register */}
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              {/* Button! */}
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

// Export for full app use
export default Signup;
