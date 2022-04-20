import { bakerEndpoint, baseurl } from "../constants";
import { getBasicHeader } from "./auth";

const deleteBaker = (name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${bakerEndpoint}?` +
      new URLSearchParams({
        name,
      }),
    { method: "DELETE", headers: { Authorization: getBasicHeader() } }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default deleteBaker;
