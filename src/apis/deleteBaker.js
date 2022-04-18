import { bakerEndpoint, baseurl } from "../constants";

const deleteBaker = (name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${bakerEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: "DELETE" }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default deleteBaker;
