import { baseurl, endpointLatestBakeOff } from "../constants";

const getLatestBakeOff = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${endpointLatestBakeOff}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getLatestBakeOff;
