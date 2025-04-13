import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Register from "./pages/Register/Register";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Hotel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8800/api/hotels"
        : "https://mern-booking-backend-sov6.onrender.com/api/hotels";

    axios
      .get(`${baseURL}/?min=1&max=999`)
      .then((response) => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>Error loading hotels: {error}</p>;

  return (
    <div>
      <h1>Hotel List</h1>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>{hotel.name || "Unnamed Hotel"}</li>
          ))}
        </ul>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthContextProvider>
        <SearchContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotels" element={<Hotel />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </SearchContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
