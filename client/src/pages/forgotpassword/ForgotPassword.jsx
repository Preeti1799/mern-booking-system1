import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css"; 


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const apiUrl = process.env.REACT_APP_API_URL
                ? `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`
                : "http://localhost:8800/api/auth/forgot-password";

            const res = await axios.post(apiUrl, { email });

            setMessage("✅ A reset link has been sent to your email.");
        } catch (err) {
            setError("❌ Email not found. Please try again.");
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="forgot-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={handleSubmit} className="forgot-button">
                    Send Reset Link
                </button>

                {message && <p className="forgot-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <p className="back-to-login">
                    <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
