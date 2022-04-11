const qrEnabled = process.env.REACT_APP_QR;

const baseurl = process.env.REACT_APP_BASE_URL;
const endpointLatestBakeOff = "/bakeoff/latest";
const endpointAllBakeOffs = "/bakeoff";

export { qrEnabled, baseurl, endpointLatestBakeOff, endpointAllBakeOffs };
