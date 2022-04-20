import { bakeoffEndpoint, baseurl } from "../constants";
import { getBasicHeader } from "./auth";

const ACTION = {
  CREATE: "POST",
  UPDATE: "PUT",
};

const updateBakeOff = (action, name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${bakeoffEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: action, headers: { Authorization: getBasicHeader() } }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default updateBakeOff;

export { ACTION };
