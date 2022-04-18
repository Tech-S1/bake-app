import {
  baseurl,
  bakerEndpoint,
  resultEndpoint,
  participantEndpoint,
} from "../constants";

const TYPE = {
  RESULTS: resultEndpoint,
  PARTICIPANT: participantEndpoint,
  BAKERS: bakerEndpoint,
};

const deleteItem = (type, data, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, {
    method: "DELETE",
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

export default deleteItem;

export { TYPE };
