// client/youtube2022/src/pages/Register/Register.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    country: "", // Add country
    img: "", // Add img
    city: "", // Add city
    phone: "", // Add phone
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("API URL:", process.env.REACT_APP_API_URL);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic client-side validation
    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.country ||
      !credentials.city ||
      !credentials.phone
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (credentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/api/auth/register`
        : "http://localhost:8800/api/auth/register";
      console.log("Sending request to:", apiUrl);
      console.log("Request payload:", credentials);

      const res = await axios.post(apiUrl, credentials, {
        withCredentials: true,
      });

      console.log("Response:", res.data);

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            value={credentials.country}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="Image URL"
            id="img"
            value={credentials.img}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            value={credentials.city}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            value={credentials.phone}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
          />
          <button type="submit" className="rButton" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <span className="error">{error}</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;