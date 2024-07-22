import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", backgroundColor: "white" }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
