import { Frame, Separator } from "react95";
import { Comment } from "../../api";
import VoteBox from "../General/VoteBox";

export default ({ comment }: { comment: Comment }) => {
  return (
    <>
      <div className="mx-2">
        <Frame variant="field" className="flex-grow-0 p-1">
          <div>{comment.author}</div>
        </Frame>
        <div className="py-4">{comment.body}</div>
        <VoteBox votes={comment.votes} />
      </div>
      <Separator />
    </>
  );
};
