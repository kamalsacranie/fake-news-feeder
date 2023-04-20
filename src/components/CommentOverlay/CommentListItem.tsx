import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Frame, Separator } from "react95";
import { useComments } from ".";
import { Comment, patchCommentVotes, RequestComment } from "../../api";
import { StorageKeys } from "../../types";
import { bm2 } from "../../utils/baseMutationQuery";
import { getLoggedVotes } from "../../utils/sessionStorage";
import CommentVoteBox from "./CommentVoteBox";

const logVote = (voteSessionKey: StorageKeys, elementId: number) => {
  const loggedVotes = getLoggedVotes("commentVotes");
  if (!loggedVotes) return;
  if (loggedVotes.includes(elementId)) return;
  loggedVotes.push(elementId);
  sessionStorage.setItem(voteSessionKey, JSON.stringify(loggedVotes));
};

export default ({ comment }: { comment: Comment }) => {
  const queryClient = useQueryClient();
  const { isFetching, ...queryInfo } = useComments(comment.article_id);
  // const { mutate } = bm2<
  //   Comment,
  //   Error,
  //   { targetId: number; votes: number },
  //   Comment[]
  // >(
  //   queryClient,
  //   ({
  //     targetId: comment_id,
  //     votes: inc_votes,
  //   }: {
  //     targetId: number;
  //     votes: number;
  //   }) => patchCommentVotes(comment_id, inc_votes),
  //   ["commentListData"],
  //   (newData, prevData) => {
  //     return prevData.map((queryComment) => {
  //       if (queryComment.comment_id === comment.comment_id) {
  //         queryComment.votes + newData.votes;
  //       }
  //       return queryComment;
  //     });
  //   }
  // );
  const { mutate } = useMutation<
    Comment,
    Error,
    { targetId: number; votes: number }
  >({
    mutationFn: ({ targetId: comment_id, votes: inc_votes }) => {
      return patchCommentVotes(comment_id, inc_votes);
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["commentListData"]); // this forces react-query to only send one

      // Snapshot the previous value
      const prevData = queryClient.getQueryData<Comment[]>(["commentListData"]);

      // Optimistically update to the new value
      if (prevData) {
        queryClient.setQueryData(
          ["commentListData"],
          prevData.map((queryComment) => {
            if (queryComment.comment_id === comment.comment_id) {
              queryComment.votes += newData.votes;
            }
            return queryComment;
          })
        );
      }

      return { prevData };
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["commentListData"]);
    },
  });
  return (
    <>
      <div className="mx-2">
        <Frame variant="field" className="flex-grow-0 p-1">
          <div>{comment.author}</div>
        </Frame>
        <div className="py-4">{comment.body}</div>
        <CommentVoteBox
          targetId={comment.comment_id}
          votes={comment.votes}
          mutate={mutate}
          targetSession="commentVotes"
        />
      </div>
      <Separator />
    </>
  );
};
