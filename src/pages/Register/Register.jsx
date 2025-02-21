import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import '../../styles/common.css';
import Message from '../../components/ui/Message/Message'


function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    });

    const [submitMessage, setSubmitMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    function validateField(name, value) {
        switch (name) {
            case "username": {
                if (!value) return "Please provide a username"
                if (value.length < 2) return "Username must be at least 2 characters"
                return "";
            }
            case "email": {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!value) return "Email is required"
                if (!emailRegex.test(value)) return "Invalid email format"
                return "";
            }

            case "password": {
                if (!value) return "A password is required"
                if (value.length < 5) return "Password must be at least 5 characters"
                const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
                if (!specialChars.test(value)) return "Password must contain at least one special character";
                return "";
            }

            case "confirmPassword": {
                if (!value) return "Please confirm your password"
                if (value !== formData.password) return "Passwords do not match"
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
            username: validateField("username", formData.username),
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
            confirmPassword: validateField("confirmPassword", formData.confirmPassword)
        }

        setErrors(newErrors);
        const newErrorValues = Object.values(newErrors);

        if (newErrorValues.every(error => error === "")) {
            console.log("Form is valid and submitted", formData)

            setMessageType("success");
            setSubmitMessage("Yay! Successfully registered!");


            setTimeout(() => {
                setSubmitMessage("");
                setMessageType("");
            }, 3000);

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } else {
            setMessageType("error");
            setSubmitMessage("Oh no! You have a boo boo:(");
        }
    }


return (
    <div className="form-container">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" id="usernameid" name="username" value={formData.username} onChange={handleChange} required />
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="emailid" name="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordid" name="password" value={formData.password} onChange={handleChange} required />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPasswordid" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <button type="submit">Register</button>
            {submitMessage && <Message type={messageType}>{submitMessage}</Message>}
            <p> Already have an account? <Link to="/login">Login here</Link></p>
        </form>
    </div>
);
}


export default Register 