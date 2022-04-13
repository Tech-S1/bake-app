import { baseurl, participantEndpoint, resultEndpoint } from "../constants";

const TYPE = {
  PARTICIPANT: participantEndpoint,
  RESULTS: resultEndpoint,
};

const create = (type, data, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
