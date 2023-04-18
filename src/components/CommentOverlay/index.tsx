import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Frame, Hourglass, ScrollView } from "react95";
import styled from "styled-components";
import { getArticleComments, Comment } from "../../api";
import { WindowBar } from "../WindowBar";
import CommentListItem from "./CommentListItem";

const FrameExtended = styled(Frame)`
  background: ${({ theme }: any) => theme.desktopBackground};
`;

const CommentOverlay = ({
  article_id,
  showComments,
  setShowComments,
  hidden,
}: {
  article_id: number;
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
  hidden?: boolean;
}) => {
  const {
    isLoading,
    error,
    data: comments,
  } = useQuery<Comment[], Error>({
    queryKey: ["commentListData"],
    queryFn: () => getArticleComments(article_id),
  });
  if (isLoading) return <Hourglass />;
  if (error) return <div>{error.message}</div>;
  if (!comments) return <></>; // we should never do this, it's so typescirpt knows we have comments
  return (
    <div hidden={hidden}>
      <FrameExtended className="absolute left-6 right-6 top-6 bottom-6 z-50 flex flex-col">
        <WindowBar
          windowTitle="Comments"
          callback={() => {
            setShowComments(!showComments);
          }}
        />
        <ScrollView className="overflow-hidden h-full">
          {comments.map((comment) => {
            return (
              <CommentListItem key={comment.comment_id} comment={comment} />
            );
          })}
        </ScrollView>
      </FrameExtended>
    </div>
  );
};

export default CommentOverlay;
