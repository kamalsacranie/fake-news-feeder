import { GrFormClose } from "react-icons/gr";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { ImInfo, ImArrowUp, ImArrowDown } from "react-icons/im";
import { Button } from "react95";
import React, {
  EventHandler,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
} from "react";

type IconButtonProps = PropsWithChildren & {
  size?: number;
  onClick?: EventHandler<SyntheticEvent>;
  color?: string;
};
const IconButtonWrapper = ({
  children,
  size,
  color,
  onClick,
}: IconButtonProps) => {
  return (
    <Button className="h-9 w-9" variant="default" onClick={onClick}>
      {React.cloneElement(children as ReactElement, {
        size,
        color,
      })}
    </Button>
  );
};

export const CloseButton = (props: IconButtonProps) => {
  return (
    <IconButtonWrapper {...props}>
      <GrFormClose />
    </IconButtonWrapper>
  );
};

export const MaximiseButton = (props: IconButtonProps) => {
  return (
    <IconButtonWrapper {...props}>
      <FaSortAmountUpAlt />
    </IconButtonWrapper>
  );
};

export const InformationButton = (props: IconButtonProps) => {
  return (
    <IconButtonWrapper {...props}>
      <ImInfo />
    </IconButtonWrapper>
  );
};

export const CommentButton = (props: IconButtonProps) => {
  return (
    <IconButtonWrapper {...props}>
      <BiCommentDetail />
    </IconButtonWrapper>
  );
};

export const VoteButton = ({
  direction,
  ...props // conflicted if the readability is worth a memCopy
}: IconButtonProps & { direction: "up" | "down" }) => {
  return (
    <IconButtonWrapper {...props}>
      {direction === "up" ? <ImArrowUp /> : <ImArrowDown />}
    </IconButtonWrapper>
  );
};
