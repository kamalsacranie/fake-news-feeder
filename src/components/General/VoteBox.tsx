import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DivProps, StorageKeys } from "../../types";
import { getLoggedVotes } from "../../utils/sessionStorage";
import { VoteButton } from "../Buttons";

const checkVote = (targetId: number, voteStorageKey: StorageKeys) => {
  const loggedVotes = getLoggedVotes(voteStorageKey);
  return loggedVotes?.includes(targetId) ? false : true;
};

const logVote = (voteSessionKey: StorageKeys, elementId: number) => {
  const loggedVotes = getLoggedVotes(voteSessionKey);
  if (!loggedVotes)
    return sessionStorage.setItem(voteSessionKey, JSON.stringify([elementId]));
  if (loggedVotes.includes(elementId)) return;
  loggedVotes.push(elementId);
  sessionStorage.setItem(voteSessionKey, JSON.stringify(loggedVotes));
};

export type VoteBoxProps = {
  targetId: number;
  mutate: UseMutateFunction<any, any, { targetId: number; votes: number }, any>;
  targetSession: StorageKeys;
};
export default ({
  targetId,
  mutate,
  targetSession,
  className,
  ...props
}: DivProps & VoteBoxProps) => {
  const { handleSubmit } = useForm();
  const [vote, setVote] = useState<1 | -1>();

  const onSubmit = () => {
    logVote(targetSession, targetId);
    mutate({ targetId: targetId, votes: vote || 0 });
    setVote(undefined);
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit(() => {
        checkVote(targetId, targetSession) && onSubmit();
      })}
    >
      <VoteButton
        onClick={() => setVote(1)}
        type="submit"
        color="blue"
        direction="up"
      />
      <VoteButton
        type="submit"
        onClick={() => setVote(-1)}
        color="red"
        direction="down"
      />
    </form>
  );
};
