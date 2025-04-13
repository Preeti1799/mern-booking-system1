import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/hotels/featured?featured=true&limit=4"); // Match backend route
  const [properties, setProperties] = useState([]);
  const [inrRate, setInrRate] = useState(83); // Default INR rate

  const selectedDate = "2024-04-01";

  useEffect(() => {
    if (Array.isArray(data)) {
      setProperties(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchInrRate = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || "http://localhost:8800"}/api/hotels/inrRate?date=${selectedDate}`
        );
        setInrRate(res.data.inrRate);
      } catch (err) {
        console.error("Failed to fetch INR rate", err);
      }
    };
    fetchInrRate();
  }, [selectedDate]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message || "Something went wrong"}</div>;

  return (
    <div className="fp">
      {properties.length > 0 ? (
        properties.map((item, index) => (
          <div className={`fpItem fpItem${index + 1}`} key={item._id}>
            <img
              src={item.photos?.[0] || "https://picsum.photos/300"}
              alt={item.name}
              className="fpImg"
              onError={(e) => (e.target.src = "https://picsum.photos/300")}
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">
              {item.cheapestPrice ? (
                <>
                  <div>Starting from ${item.cheapestPrice}</div>
                  <div>
                    ₹{(item.cheapestPrice * inrRate).toLocaleString("en-IN")}
                  </div>
                </>
              ) : (
                "Price unavailable"
              )}
            </span>
            {item.rating ? (
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            ) : (
              <span>No rating available</span>
            )}
          </div>
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default FeaturedProperties;