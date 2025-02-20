import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import '../../styles/common.css'


function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert ("Passwords do not match")
            return
        }
        console.log("Submitted register", formData)
    }
    return (
      <div className="form-container">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" id="usernameid" name="username" value={formData.username} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPasswordid" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
            </div>
            <button type="submit">Register</button>
            <p> Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    )
  }
  
  export default Register 