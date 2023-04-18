import { Button } from "react95";
import { VoteButton } from "../Buttons";

export default ({ votes }: { votes: number }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-2">
        <Button active>{votes}</Button>
      </div>
      <div>
        <VoteButton color="blue" direction="up" />
        <VoteButton color="red" direction="down" />
      </div>
    </div>
  );
};
