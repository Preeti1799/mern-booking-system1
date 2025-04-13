import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8800"; // Hardcode for now to test

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("✅ Full API URL:", `${BASE_URL}${url}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${url}`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;