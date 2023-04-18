import { EventHandler, SyntheticEvent, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { WindowHeader } from "react95";
import { CloseButton } from "../components/Buttons";

export const WindowBar = ({
  windowTitle,
  children,
  callback = () => {},
  link,
}: PropsWithChildren & {
  windowTitle: string;
  callback?: EventHandler<SyntheticEvent>;
  link?: { link: string; state?: any };
}) => {
  return (
    <WindowHeader className="flex justify-between items-center h-12">
      <div className="font-bold">{windowTitle}</div>
      <div className="flex items-center">
        {children}
        {link ? (
          <Link to={link.link} className="flex items-center">
            <CloseButton size={90} />
          </Link>
        ) : (
          <CloseButton size={90} onClick={callback} />
        )}
      </div>
    </WindowHeader>
  );
};
