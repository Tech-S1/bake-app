import {
  bakerEndpoint,
  baseEndpoint,
  baseurl,
  judgeEndpoint,
  latestEndpoint,
  totalsEndpoint,
} from "../constants";
import { getBasicHeader } from "./auth";

const TYPE = {
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
  ALL_BAKE_OFFS: baseEndpoint,
  LATEST_BAKE_OFF: latestEndpoint,
  TOTALS: totalsEndpoint,
};

const get = (type, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, { headers: { Authorization: getBasicHeader() } })
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default get;

export { TYPE };
