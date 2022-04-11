import { baseEndpoint, baseurl } from "../constants";

const createBakeOff = (name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${baseEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: "POST" }
  )
    // .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default createBakeOff;
