import {
  baseurl,
  judgeEndpoint,
  bakerEndpoint,
  resultEndpoint,
  participantEndpoint,
} from "../constants";
import { getBasicHeader } from "./auth";

const TYPE = {
  RESULTS: resultEndpoint,
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
  PARTICIPANT: participantEndpoint,
};

const update = (type, data, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, {
    method: "PUT",
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

export default update;

export { TYPE };
