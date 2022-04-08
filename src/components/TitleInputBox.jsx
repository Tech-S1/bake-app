import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const TitleInputBox = ({ value, handleChange, handleSave }) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "50%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter Bake Off Title"
        value={value}
        onChange={handleChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={handleSave} color="primary" sx={{ p: "10px" }}>
        <SaveIcon />
      </IconButton>
    </Paper>
  );
};

export default TitleInputBox;
