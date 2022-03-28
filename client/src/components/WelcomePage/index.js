import React from 'react'
import Auth from '../../utils/auth'
import {Link} from 'react-router-dom'

import './welcomepage.css'

export default function index() {
    const loggedIn = Auth.loggedIn();
    console.log(loggedIn)
    return (
        <div className="welcome-div">
            <h1>Welcome Page</h1>
      
            <button>
        {loggedIn ? (
            <Link to="/dashboard">Dashboard</Link>
        ) : (
            <Link to="/signup">Signup / Login</Link>
        )}
            </button>
        </div>
    )
}
