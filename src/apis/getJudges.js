import { baseurl, judgeEndpoint } from "../constants";

const getJudges = (callbackSuccess, callbackError) =>
  fetch(`${baseurl}${judgeEndpoint}`)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => callbackError(error)
    );

export default getJudges;
