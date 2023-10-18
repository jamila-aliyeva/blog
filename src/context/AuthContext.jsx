import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../constants";
import { useEffect } from "react";
import request from "../server";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );

  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     let { data } = await request.get("auth.me");
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // });

  const [role, setRole] = useState(localStorage.getItem(ROLE));

  const state = {
    isAuthenticated,
    role,
    setIsAuthenticated,
    setRole,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
