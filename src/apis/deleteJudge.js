import { judgeEndpoint, baseurl } from "../constants";

const deleteJudge = (judgeName, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${judgeEndpoint}?` +
      new URLSearchParams({
        judgeName,
      }),
    { method: "DELETE" }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default deleteJudge;
