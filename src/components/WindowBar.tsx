import React, {
  EventHandler,
  SyntheticEvent,
  PropsWithChildren,
  PropsWithRef,
} from "react";
import { Link } from "react-router-dom";
import { WindowHeader } from "react95";
import { CloseButton } from "../components/Buttons";
import { DivProps } from "../types";

export type WindowBarProps = DivProps & {
  windowTitle: string;
  callback?: EventHandler<SyntheticEvent>;
  link?: { link: string; state?: any };
};
export const WindowBar = React.forwardRef<HTMLDivElement, WindowBarProps>(
  ({ windowTitle, children, callback = () => {}, link, className }, ref) => {
    return (
      <WindowHeader
        ref={ref}
        className={`flex justify-between items-center h-12 ${className}`}
      >
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
  }
);
