import { GrFormClose } from "react-icons/gr";
import { FaSortAmountUpAlt } from "react-icons/fa";
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
};
const IconButtonWrapper = ({ children, size, onClick }: IconButtonProps) => {
  return (
    <Button className="h-9 w-9" variant="default" onClick={onClick}>
      {React.cloneElement(children as ReactElement, { size })}
    </Button>
  );
};

export const CloseButton = ({ size }: IconButtonProps) => {
  return (
    <IconButtonWrapper size={size}>
      <GrFormClose />
    </IconButtonWrapper>
  );
};

export const MaximiseButton = ({ size, onClick }: IconButtonProps) => {
  return (
    <IconButtonWrapper size={size} onClick={onClick}>
      <FaSortAmountUpAlt />
    </IconButtonWrapper>
  );
};
