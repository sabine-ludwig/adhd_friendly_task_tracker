import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Task Tracker</b>
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/tasks" style={{ textDecoration: "none", color: "white" }}>
              Tasks
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/rewards" style={{ textDecoration: "none", color: "white" }}>
              Rewards
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/trends" style={{ textDecoration: "none", color: "white" }}>
              Trends
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
