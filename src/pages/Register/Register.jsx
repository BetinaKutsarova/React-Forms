import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../../styles/common.css';
import FormInput from '../../components/ui/Input/Input';
import Message from '../../components/ui/Message/Message';
import PasswordStrengthIndicator from '../../components/ui/PasswordStrengthIndicator/PasswordStrengthIndicator';
import registerUser from '../../utils/RegisterUser';

function Register() {
    const [submitMessage, setSubmitMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

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
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                createdAt: new Date().toISOString()
            }

            registerUser(userData)
                .then(() => {
                    setMessageType("success");
                    setSubmitMessage("Yay! Successfully registered!");

                    // setTimeout(() => {
                    //     setSubmitMessage("");
                    //     setMessageType("");
                    // }, 3000);

                    setTimeout(() => {
                        navigate('/home');
                    }, 1500);

                    setFormData({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    });
                })
                .catch(error => {
                    setMessageType("error", error);
                    setSubmitMessage("Registration failed. Please try again.");
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
                <FormInput
                    label="Username"
                    name="username"
                    type="text"
                    id="usernameid"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    required
                />

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
                >
                    <PasswordStrengthIndicator password={formData.password} />
                </FormInput>

                <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    id="confirmPasswordid"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                />

                <button type="submit">Register</button>
                {submitMessage && <Message type={messageType}>{submitMessage}</Message>}
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
}

export default Register;