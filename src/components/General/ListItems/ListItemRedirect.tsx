import { DivProps } from "../../../types";
import LinkedWindowHeader from "./LinkedWindowHeader";
import ListItemBase from "./ListItemBase";

const ListItemRedirect = ({
  children,
  onClick,
  ...props
}: DivProps & { to: string; state?: any; windowTitle: string }) => {
  return (
    <ListItemBase
      onClick={onClick}
      windowHeader={<LinkedWindowHeader {...props} />}
    >
      {children}
    </ListItemBase>
  );
};

export default ListItemRedirect;
