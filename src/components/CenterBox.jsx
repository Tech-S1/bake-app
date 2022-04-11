import React from "react";
import { Box } from "@mui/system";

const CenterBox = ({ children, height, width }) => {
  return (
    <Box
      display="flex"
      width={width || "100%"}
      justifyContent="center"
      alignItems="center"
      height={height}
      style={{ padding: "25px" }}
    >
      {children}
    </Box>
  );
};

export default CenterBox;
