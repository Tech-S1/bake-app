import {
  baseurl,
  judgeEndpoint,
  bakerEndpoint,
  resultEndpoint,
} from "../constants";

const TYPE = {
  RESULTS: resultEndpoint,
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
};

const update = (type, data, callbackSuccess, callbackError) =>
  fetch(`${baseurl}${type}`, {
    method: "PUT",
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

export default update;

export { TYPE };
