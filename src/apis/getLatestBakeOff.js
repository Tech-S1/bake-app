import { baseurl, latestEndpoint } from "../constants";

const getLatestBakeOff = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${latestEndpoint}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getLatestBakeOff;
