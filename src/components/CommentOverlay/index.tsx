import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Frame, Hourglass, ScrollView } from "react95";
import styled from "styled-components";
import { getArticleComments, Comment } from "../../api";
import { AddCommentButton } from "../Buttons";
import { WindowBar } from "../WindowBar";
import AddCommentWindow from "./AddCommentWindow";
import CommentListItem from "./CommentListItem";

const FrameExtended = styled(Frame)`
  background: ${({ theme }: any) => theme.desktopBackground};
`;

export function useComments<TData = Comment[]>(
  article_id: number,
  options?: UseQueryOptions<Comment[], Error, TData>
) {
  return useQuery({
    queryKey: ["commentListData"],
    queryFn: () => getArticleComments(article_id),
    ...options,
  });
}

const CommentOverlay = ({
  article_id,
  showComments,
  setShowComments,
}: {
  article_id: number;
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
}) => {
  const [addCommentsVisibilty, setAddCommentsVisibilty] = useState(true);

  const {
    isLoading,
    error,
    data: comments,
  } = useComments<Comment[]>(article_id, {
    select: (data) => data,
    notifyOnChangeProps: ["data"],
  });

  if (isLoading) return <Hourglass />;
  if (error) return <div>{error.message}</div>;
  if (!comments) return <></>; // we should never do this, it's so typescirpt knows we have comments

  return (
    <>
      <div hidden={addCommentsVisibilty} className="absolute flex-grow">
        <AddCommentWindow
          article_id={article_id}
          hideWindowCallback={() =>
            setAddCommentsVisibilty(!addCommentsVisibilty)
          }
        />
      </div>
      <FrameExtended className="absolute left-6 right-6 top-6 bottom-6 z-10 flex flex-col">
        <WindowBar
          windowTitle="Comments"
          callback={() => {
            setShowComments(!showComments);
          }}
        >
          <AddCommentButton
            size={20}
            onClick={() => setAddCommentsVisibilty(!addCommentsVisibilty)}
          />
        </WindowBar>
        <ScrollView className="overflow-hidden h-full">
          {comments.map((comment) => {
            return (
              <CommentListItem key={comment.comment_id} comment={comment} />
            );
          })}
        </ScrollView>
      </FrameExtended>
    </>
  );
};

export default CommentOverlay;
