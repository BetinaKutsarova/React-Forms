import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/common.css';
import FormInput from '../../components/ui/Input/Input';
import Message from '../../components/ui/Message/Message';

function Login() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  function validateField(name, value) {
    switch (name) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Invalid email format"
        if (!value) return "Please enter the email you registered with"
        return "";
      }
      case "password": {
        if (!value) return "Please enter your password"
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/; // do i need this here?
        if (!specialChars.test(value) || (value.length < 5)) return "Invalid password";
        return "";
      }
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

      setMessageType("success");
      setSubmitMessage("Yay! Successfully logged in!");
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);

      setFormData({
        email: "",
        password: ""
      });

    } else {
      setMessageType("error");
      setSubmitMessage("Oh no! You have a boo boo:(");
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          label="Email"
          name="email"
          type="email"
          id="emailid"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          id="passwordid"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <button type="submit">Login</button>
        {submitMessage && <Message type={messageType}>{submitMessage}</Message>}
        <p>Don&apos;t have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;