import { participantEndpoint, baseurl } from "../constants";

const deleteParticipant = (entrantId, callbackSuccess, callbackError) =>
  fetch(
    `${baseurl}${participantEndpoint}?` +
      new URLSearchParams({
        entrantId,
      }),
    { method: "DELETE" }
  ).then(
    (result) => {
      callbackSuccess(result);
    },
    (error) => callbackError(error)
  );

export default deleteParticipant;
