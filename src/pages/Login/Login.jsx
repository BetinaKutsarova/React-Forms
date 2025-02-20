import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai' 
import './Login.css';
import '../../styles/common.css';

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  function validateField(name, value) {
    switch (name) {
      case "email":
        if (!value) return "Please enter the email you registered with"
        return "";
      case "password":
        if (!value) return "Please enter your password"
        return "";
      default:
        return "";
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    }

    setErrors(newErrors);
    const newErrorValues = Object.values(newErrors);

    if (newErrorValues.every(error => error === "")) {
        console.log("Form is valid and submitted", formData)
    }

    console.log('submitted login', formData)
  }

  return (
    <div className="form-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="emailid" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className='form-group'>
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input 
            type={showPassword ? "text" : "password"} 
            id="passwordid" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

        <button type="submit">Login</button>
        <p> Dont have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login