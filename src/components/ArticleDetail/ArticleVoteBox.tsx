import { Button } from "react95";
import { DivProps } from "../../types";
import VoteBox, { VoteBoxProps } from "../General/VoteBox";

export default ({
  votes,
  ...props
}: DivProps & VoteBoxProps & { votes: number }) => {
  return (
    <div className={`absolute left-0 bottom-0 flex`}>
      <VoteBox {...props} />
      <Button variant="flat">{votes}</Button>
    </div>
  );
};
