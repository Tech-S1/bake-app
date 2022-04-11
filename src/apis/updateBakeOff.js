import { baseEndpoint, baseurl } from "../constants";

const updateBakeOff = (name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${baseEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: "PUT" }
  )
    // .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default updateBakeOff;
