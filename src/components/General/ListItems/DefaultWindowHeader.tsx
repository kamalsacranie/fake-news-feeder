import { WindowHeader } from "react95";
import { DivProps } from "../../../types";

const DefaultWindowHeader = ({
  active,
  windowTitle,
}: DivProps & { active?: boolean; windowTitle: string }) => {
  return (
    <WindowHeader active={active} className="h-16 overflow-hidden text-xl">
      {windowTitle}
    </WindowHeader>
  );
};

export default DefaultWindowHeader;
