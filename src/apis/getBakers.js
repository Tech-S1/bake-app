import { bakerEndpoint, baseurl } from "../constants";

const getBakers = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${bakerEndpoint}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getBakers;
