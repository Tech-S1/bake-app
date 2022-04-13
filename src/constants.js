const qrEnabled = process.env.REACT_APP_QR;

const baseurl = process.env.REACT_APP_BASE_URL;
const baseEndpoint = "/bakeoff";
const latestEndpoint = `${baseEndpoint}/latest`;
const judgeEndpoint = `${baseEndpoint}/judge`;
const bakerEndpoint = `${baseEndpoint}/baker`;
const participantEndpoint = `${baseEndpoint}/participant`;
const resultEndpoint = `${baseEndpoint}/result`;

export {
  qrEnabled,
  baseurl,
  baseEndpoint,
  latestEndpoint,
  judgeEndpoint,
  bakerEndpoint,
  participantEndpoint,
  resultEndpoint,
};
