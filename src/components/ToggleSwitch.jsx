import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const ToggleSwitch = ({ text, enabled, setEnabled }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={enabled}
          onChange={({ target }) => setEnabled(target.checked)}
        />
      }
      label={text}
    />
  );
};

export default ToggleSwitch;
