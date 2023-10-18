// import { Fragment } from "react";
import { Outlet } from "react-router-dom";


import Header from "./Header";
import Footer from "./Footer";

const FrontLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontLayout;
