import { StorageKeys } from "../types";

export const getLoggedVotes = (voteSessionKey: StorageKeys) => {
  const loggedVotesStored = sessionStorage.getItem(voteSessionKey);
  if (!loggedVotesStored) return;
  const loggedVotes: number[] = JSON.parse(loggedVotesStored);
  return loggedVotes;
};
