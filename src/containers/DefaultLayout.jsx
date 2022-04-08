import React from "react";
import NavBar from "../components/NavBar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default DefaultLayout;
