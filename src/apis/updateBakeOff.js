import { baseEndpoint, baseurl } from "../constants";

const ACTION = {
  CREATE: "POST",
  UPDATE: "PUT",
};

const updateBakeOff = (action, name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${baseEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: action }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default updateBakeOff;

export { ACTION };
