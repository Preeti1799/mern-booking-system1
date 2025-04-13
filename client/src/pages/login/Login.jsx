// client/youtube2022/src/pages/login/Login.jsx
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const apiUrl = process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/api/auth/login` // Ensure /api prefix
        : "http://localhost:8800/api/auth/login";

      const res = await axios.post(apiUrl, credentials, { withCredentials: true });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      console.error("❌ Login Error:", errorMessage);
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />
        <button
          onClick={handleClick}
          className="lButton"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <span className="error">❌ {error}</span>}
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;