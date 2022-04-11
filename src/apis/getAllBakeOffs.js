import { baseEndpoint, baseurl } from "../constants";

const getAllBakeOffs = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${baseEndpoint}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getAllBakeOffs;
