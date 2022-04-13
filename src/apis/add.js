import { bakerEndpoint, baseurl, judgeEndpoint } from "../constants";

const TYPE = {
  JUDGES: judgeEndpoint,
  BAKERS: bakerEndpoint,
};

const add = (type, name, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${type}?` +
      new URLSearchParams({
        name,
      }),
    { method: "POST" }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default add;

export { TYPE };
