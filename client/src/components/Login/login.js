// Imports
import React, { useState } from 'react';

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

    // clear form values
    setFormState({
      email: '',
      password: ''
    });

    // Returns this layout on user/client request
    return (
      <main>
        <div>
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body"></div>
            {/* Login form   */}
            <form onSubmit={submitForm}>
              {/* Client email input render */}
              <input
                className="form-input"
                placeholder="Enter email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleFormChange}
              />
              {/* Client password input render*/}
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleFormChange}
              />
              {/* A button to submit, because who doesnt love buttons.*/}
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  };
};

// Exports our function for global use
export default Login;
