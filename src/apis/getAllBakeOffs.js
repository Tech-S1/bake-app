import { baseurl, endpointAllBakeOffs } from "../constants";

const getAllBakeOffs = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${endpointAllBakeOffs}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getAllBakeOffs;
