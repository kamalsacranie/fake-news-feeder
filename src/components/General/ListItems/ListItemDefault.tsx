import { DivProps } from "../../../types";
import DefaultWindowHeader from "./DefaultWindowHeader";
import ListItemBase from "./ListItemBase";

const ListItemDefault = ({
  windowTitle,
  children,
  onClick,
  ...props
}: DivProps & { windowTitle: string }) => {
  return (
    <ListItemBase
      onClick={onClick}
      windowHeader={<DefaultWindowHeader windowTitle={windowTitle} />}
    >
      {children}
    </ListItemBase>
  );
};
