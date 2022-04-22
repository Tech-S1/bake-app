import { baseurl, awsEndpoint } from "../constants";

const retrievePhoto = (
  entrantId,
  bakeoffDate,
  callbackSuccess,
  callbackError
) => {
  let url = `${baseurl}${awsEndpoint}/download/${entrantId}?`;
  if (!!bakeoffDate) {
    url =
      url +
      new URLSearchParams({
        bakeoffDate,
      });
  }
  fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        callbackSuccess(result);
      },
      (error) => {
        console.log(error);
        callbackError(error);
      }
    );
};

export default retrievePhoto;
