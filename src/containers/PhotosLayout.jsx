import React from "react";
import NavBar from "../components/NavBar";
import endpoints from "../routes/endpoints";

const PhotosLayout = ({ children }) => (
  <div>
    <NavBar nonDefaultEndpoints={[endpoints[0]]} />
    {children}
  </div>
);

export default PhotosLayout;
