import { Link } from "react-router-dom";
import DefaultWindowHeader from "./DefaultWindowHeader";

const LinkedWindowHeader = ({
  to,
  state,
  active = false,
  windowTitle,
}: {
  to: string;
  state?: any;
  active?: boolean;
  windowTitle: string;
}) => {
  return (
    <Link to={to} state={state}>
      <DefaultWindowHeader active={active} windowTitle={windowTitle} />
    </Link>
  );
};

export default LinkedWindowHeader;
