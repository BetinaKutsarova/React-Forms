// import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
    return (
      <div>
        <h1>Login</h1>
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password"/>
            </div>
            <button type="submit">Login</button>
            <p> Dont have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    )
  }
  
  export default Login