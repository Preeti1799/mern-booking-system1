import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/" className="navLink">Max Grand Suites</Link>
        </span>
        <div className="navItems">
          {user ? (
            <>
              <span className="navUser">Hello, {user.username}</span>
              <button className="navButton" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="navButton">
                <Link to="/register" className="navLink">Register</Link>
              </button>
              <button className="navButton" onClick={() => navigate("/login")}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
