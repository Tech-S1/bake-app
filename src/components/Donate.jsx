import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { qrImageUrl } from "../constants";

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
        logoImage={qrImageUrl}
      />
    </Box>
  </Stack>
);

export default Donate;
