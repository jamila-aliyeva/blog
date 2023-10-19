import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );

  const [role, setRole] = useState(localStorage.getItem(ROLE));

  // const logout = () => {
  //   Cookies.remove(TOKEN);
  //   localStorage.remove(TOKEN);
  //   setIsAuthenticated(false);
  //   navigate("/login");
  // };

  const state = {
    isAuthenticated,
    role,
    setIsAuthenticated,
    setRole,
    // logout,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
