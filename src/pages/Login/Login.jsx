import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import '../../styles/common.css';

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }

    function handleSubmit(e) {
        e.preventDefault()
        console.log('submitted login', formData)
    }

    return (
      <div className="form-container">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <button type="submit">Login</button>
            <p> Dont have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    );
  }
  
  export default Login