import { DivProps } from "../../../types";
import LinkedWindowHeader from "./LinkedWindowHeader";
import ListItemBase from "./ListItemBase";

const ListItemRedirect = ({
  children,
  onClick,
  className,
  ...props
}: DivProps & { to: string; state?: any; windowTitle: string }) => {
  return (
    <ListItemBase
      onClick={onClick}
      windowHeader={<LinkedWindowHeader {...props} />}
      className={className}
    >
      {children}
    </ListItemBase>
  );
};

export default ListItemRedirect;
