import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const Donate = ({ url }) => {
  return (
    <Stack>
      <Box display="flex" width="100%" justifyContent="center">
        <Typography variant="h5" gutterBottom component="div">
          Donate Now!
        </Typography>
      </Box>
      <Box display="flex" width="100%" justifyContent="center">
        <QRCode value={url} size="100" />
      </Box>
    </Stack>
  );
};

export default Donate;
