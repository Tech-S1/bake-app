import React from "react";
import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";
import endpoints from "./endpoints";

const Routes = () => (
  <BrowserRouter>
    <AppRoutes>
      {endpoints.map(({ name, path, element }) => (
        <Route key={name} path={path} element={element} />
      ))}
    </AppRoutes>
  </BrowserRouter>
);

export default Routes;
