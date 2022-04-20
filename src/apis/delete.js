import {
  baseurl,
  bakerEndpoint,
  resultEndpoint,
  participantEndpoint,
} from "../constants";
import { getBasicHeader } from "./auth";

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

export default deleteItem;

export { TYPE };
