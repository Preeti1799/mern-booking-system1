import { createContext, useReducer, useEffect } from "react";

// Get the saved user data from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

// Initial state
const INITIAL_STATE = {
  user: storedUser,
  loading: false,
  error: null,
};

// Create Context
export const AuthContext = createContext(INITIAL_STATE);

// Reducer function to handle authentication actions
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "REGISTER_SUCCESS": // Add this case for registration
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
      return { user: action.payload, loading: false, error: null };
    case "LOGOUT":
      localStorage.removeItem("user"); // Clear user data on logout
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

// Context Provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Persist user data when state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};