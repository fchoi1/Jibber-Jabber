// Imports
import rect, { useState } from 'react';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
};

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

  return (
    <main>
      <div>
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body"></div>
          <form onSubmit={submitForm}>
            <input
              className="form-input"
              placeholder="Enter email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleFormChange}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
