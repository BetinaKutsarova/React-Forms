// import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'


function Register() {
    return (
      <div>
        <h1>Register</h1>
        <form>
            <div>
                <label htmlFor="username">Username</label>
                <input type="username" id="usernameid" name="username"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password"/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPasswordid" name="confirmPassword"/>
            </div>
            <button type="submit">Register</button>
            <p> Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    )
  }
  
  export default Register 