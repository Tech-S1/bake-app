const qrEnabled = process.env.REACT_APP_QR_ENABLED;
const qrUrl = process.env.REACT_APP_QR_URL;
const qrImageUrl = process.env.REACT_APP_QR_PHOTO;

const baseurl = process.env.REACT_APP_BASE_URL;
const baseEndpoint = "/bakeoff";
const latestEndpoint = `${baseEndpoint}/latest`;
const bakeoffEndpoint = `${baseEndpoint}/event`;
const judgeEndpoint = `${baseEndpoint}/judge`;
const bakerEndpoint = `${baseEndpoint}/baker`;
const participantEndpoint = `${baseEndpoint}/participant`;
const resultEndpoint = `${baseEndpoint}/result`;
const totalsEndpoint = `${baseEndpoint}/totals`;
const awsEndpoint = `/aws`;

export {
  qrEnabled,
  qrUrl,
  qrImageUrl,
  baseurl,
  baseEndpoint,
  latestEndpoint,
  judgeEndpoint,
  bakerEndpoint,
  participantEndpoint,
  resultEndpoint,
  bakeoffEndpoint,
  totalsEndpoint,
  awsEndpoint,
};
