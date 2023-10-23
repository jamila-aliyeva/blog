// import { NavLink } from "react-router-dom";
// import { AiOutlineOrderedList } from "react-icons/ai";
// import "./Header.scss";
// import headerLogo from "../../../assets/images/Logo.svg";
// import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// const Header = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [navOpen, setNavOpen] = useState(false);
//   return (
//     <header>
//       <nav className="container">
//         <div className="header-wrapper">
//           <div
//             className="header-logo"
//             style={{ display: "flex", alignItems: "center", gap: "25px" }}>
//             <div className="menu-bar">
//               <AiOutlineOrderedList
//                 style={{ color: "white", fontSize: "28px", cursor: "pointer" }}
//               />
//             </div>
//             {isAuthenticated ? (
//               <NavLink
//                 to="/my-posts"
//                 style={{
//                   color: "#FFD050",
//                   fontSize: "26px",
//                   fontFamily: `Open Sans', sans-serif`,
//                 }}>
//                 My Blogs
//               </NavLink>
//             ) : (
//               <NavLink to="/">
//                 <img src={headerLogo} alt="" />
//               </NavLink>
//             )}
//           </div>

//           <div>
//             <div className={`${"nav_menu"} ${navOpen ? "navOpen" : null}`}>
//               <div className="sections">
//                 <NavLink onClick={() => setNavOpen(false)} to="/">
//                   Home
//                 </NavLink>
//                 <NavLink onClick={() => setNavOpen(false)} to="/posts">
//                   Blog
//                 </NavLink>
//                 <NavLink onClick={() => setNavOpen(false)} to="/about-us">
//                   About us
//                 </NavLink>
//                 <NavLink onClick={() => setNavOpen(false)} to="/register">
//                   Register
//                 </NavLink>
//               </div>
//               <div className="login">
//                 {isAuthenticated ? (
//                   <NavLink onClick={() => setNavOpen(false)} to="/account">
//                     Account
//                   </NavLink>
//                 ) : (
//                   <NavLink onClick={() => setNavOpen(false)} to="/login">
//                     Login
//                   </NavLink>
//                 )}
//               </div>
//               <li className="closeNav" onClick={() => setNavOpen(false)}>
//                 <HiXMark color="white" size={35} />
//               </li>
//             </div>
//             <button className="openNav" onClick={() => setNavOpen(true)}>
//               <HiBars3BottomRight color="white" size={35} />
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };
// export default Header;

// // font-family: 'Inter', sans-serif;
// // font-family: 'Open Sans', sans-serif;

import styles from "./Header.module.scss";
import Logo from "../../../assets/images/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav>
          <div className={styles.logo}>
            {isAuthenticated ? (
              <Link
                style={{
                  color: "#FFD050",
                  fontSize: "26px",
                  fontFamily: `Open Sans', sans-serif`,
                }}
                to="/my-posts">
                My blogs
              </Link>
            ) : (
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            )}
          </div>
          <div className={styles.right}>
            <ul
              className={`${styles.nav_menu} ${
                navOpen ? styles.navOpen : null
              }`}>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/posts">Blog</NavLink>
              </li>
              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/about-us">About Us</NavLink>
              </li>

              <li onClick={() => setNavOpen(false)}>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li
                onClick={() => setNavOpen(false)}
                className={styles.login_accaunt}>
                {isAuthenticated ? (
                  <Link to="/account">
                    <button>Account</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                )}
              </li>
              <li className={styles.closeNav} onClick={() => setNavOpen(false)}>
                <HiXMark color="white" size={35} />
              </li>
            </ul>
            <button className={styles.openNav} onClick={() => setNavOpen(true)}>
              <HiBars3BottomRight color="white" size={35} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
