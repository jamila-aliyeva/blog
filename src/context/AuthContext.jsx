import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );

  const [role, setRole] = useState(localStorage.getItem(ROLE));
  const [savedPassword, setSavedPassword] = useState(null);
  const [savedUsername, setSavedUsername] = useState(null);
  const [loading, setLoading] = useState(false);

  const state = {
    isAuthenticated,
    role,
    savedPassword,
    savedUsername,
    loading,
    setLoading,
    setIsAuthenticated,
    setRole,
    setSavedPassword,
    setSavedUsername,
    // logout,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
