import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";

const Donate = ({ url }) => (
  <Stack>
    <Box display="flex" width="100%" justifyContent="center">
      <Typography variant="h5" gutterBottom component="div">
        Donate Now!
      </Typography>
    </Box>
    <Box display="flex" width="100%" justifyContent="center">
      <QRCode
        value={url}
        eyeRadius={5}
        qrStyle="dots"
        removeQrCodeBehindLogo
        ecLevel="H"
        logoImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/666px-PayPal_Logo_Icon_2014.svg.png"
      />
    </Box>
  </Stack>
);

export default Donate;
