import {
  bakerEndpoint,
  baseEndpoint,
  baseurl,
  judgeEndpoint,
  latestEndpoint,
} from "../constants";

const TYPE = {
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
  ALL_BAKE_OFFS: baseEndpoint,
  LATEST_BAKE_OFF: latestEndpoint,
};

const get = (type, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default get;

export { TYPE };
