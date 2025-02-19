import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }

    function handleSubmit(e) {
        e.preventDefault()
        console.log('submitted login', formData)
    }

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <button type="submit">Login</button>
            <p> Dont have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    )
  }
  
  export default Login