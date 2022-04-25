import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import endpoints from "../routes/endpoints";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import DrawerComponent from "./DrawerComponent";

const NavBar = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bake Off
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <>
            {endpoints
              .filter((endpoint) => endpoint.navbar)
              .map(({ name, path }) => (
                <Button
                  key={name}
                  color="inherit"
                  onClick={() => navigate(path)}
                >
                  {name}
                </Button>
              ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
