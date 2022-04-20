import { participantEndpoint, baseurl } from "../constants";
import { getBasicHeader } from "./auth";

const deleteParticipant = (entrantId, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${participantEndpoint}?` +
      new URLSearchParams({
        entrantId,
      }),
    { method: "DELETE", headers: { Authorization: getBasicHeader() } }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default deleteParticipant;
