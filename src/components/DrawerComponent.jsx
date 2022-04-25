import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, IconButton, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import endpoints from "../routes/endpoints";

const DrawerComponent = () => {
  let navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {endpoints
            .filter((endpoint) => endpoint.navbar)
            .map(({ name, path }) => (
              <ListItem key={name} onClick={() => setOpenDrawer(false)}>
                <Button
                  key={name}
                  color="inherit"
                  onClick={() => navigate(path)}
                  fullWidth
                >
                  {name}
                </Button>
              </ListItem>
            ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default DrawerComponent;
