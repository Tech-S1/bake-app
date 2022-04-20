import { baseurl, participantEndpoint, resultEndpoint } from "../constants";
import { getBasicHeader } from "./auth";

const TYPE = {
  PARTICIPANT: participantEndpoint,
  RESULTS: resultEndpoint,
};

const create = (type, data, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBasicHeader(),
    },
    body: JSON.stringify(data),
  }).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => {
      console.log(error);
      callbackError(error);
    }
  );

export default create;

export { TYPE };
