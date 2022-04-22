import { baseurl, awsEndpoint } from "../constants";
import { getBasicHeader } from "./auth";

const uploadPhoto = (entrantId, file, callbackSuccess, callbackError) => {
  const formData = new FormData();
  formData.append("file", file);
  fetch(`${baseurl}${awsEndpoint}/upload/${entrantId}`, {
    method: "POST",
    body: formData,
    headers: { Authorization: getBasicHeader() },
  }).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => {
      console.log(error);
      callbackError(error);
    }
  );
};

export default uploadPhoto;
