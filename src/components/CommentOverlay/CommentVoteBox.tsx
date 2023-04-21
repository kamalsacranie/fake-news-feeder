import { Button } from "react95";
import { DivProps } from "../../types";
import VoteBox, { VoteBoxProps } from "../General/VoteBox";

const CommentVoteBox = ({
  className,
  votes,
  ...props
}: DivProps & VoteBoxProps & { votes: number }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="p-2">
        <Button active>{votes}</Button>
      </div>
      <VoteBox {...props} />
    </div>
  );
};

export default CommentVoteBox;
