import { bakerEndpoint, baseurl, judgeEndpoint } from "../constants";
import { getBasicHeader } from "./auth";

const TYPE = {
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
};

const add = (type, name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${type}?` +
      new URLSearchParams({
        name,
      }),
    { method: "POST", headers: { Authorization: getBasicHeader() } }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default add;

export { TYPE };
