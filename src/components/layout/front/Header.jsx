import { NavLink } from "react-router-dom";
import { AiOutlineOrderedList } from "react-icons/ai";
import "./Header.scss";
import headerLogo from "../../../assets/images/Logo.svg";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <nav className="container">
        <div className="header-wrapper">
          <div
            className="header-logo"
            style={{ display: "flex", alignItems: "center", gap: "25px" }}>
            <div className="menu-bar">
              <AiOutlineOrderedList
                style={{ color: "white", fontSize: "28px", cursor: "pointer" }}
              />
            </div>
            {isAuthenticated ? (
              <NavLink
                to="/my-posts"
                style={{
                  color: "#FFD050",
                  fontSize: "26px",
                  fontFamily: `Open Sans', sans-serif`,
                }}>
                My Blogs
              </NavLink>
            ) : (
              <NavLink to="/">
                <img src={headerLogo} alt="" />
              </NavLink>
            )}
          </div>
          <div className="header-section">
            <div className="sections">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/posts">Blog</NavLink>
              <NavLink to="/about-us">About us</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div className="login">
              {isAuthenticated ? (
                <NavLink to="/account">Account</NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;

// font-family: 'Inter', sans-serif;
// font-family: 'Open Sans', sans-serif;
