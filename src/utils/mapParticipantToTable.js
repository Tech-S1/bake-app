const mapParticipantToTable = (participant) => ({
  bakerId: participant.entrantId,
  name: participant.name,
  appearance:
    participant.results.length === 0
      ? 0
      : participant.results
          .map((result) => result.appearance)
          .reduce((prev, next) => prev + next),
  taste:
    participant.results.length === 0
      ? 0
      : participant.results
          .map((result) => result.taste)
          .reduce((prev, next) => prev + next),
  total:
    participant.results.length === 0
      ? 0
      : participant.results
          .map((result) => result.appearance)
          .reduce((prev, next) => prev + next) +
        participant.results
          .map((result) => result.taste)
          .reduce((prev, next) => prev + next),
});

export default mapParticipantToTable;
