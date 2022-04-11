import { baseurl, endpointBase } from "../constants";

const getLatestBakeOff = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${endpointBase}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getLatestBakeOff;
