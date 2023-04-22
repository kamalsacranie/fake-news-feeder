import React, { ReactElement, useState } from "react";
import { Separator, Window } from "react95";
import { DivProps } from "../../../types";

const ListItemBase = ({
  onClick,
  children,
  windowHeader,
  className,
}: DivProps & { windowHeader: ReactElement }) => {
  const [active, setActive] = useState(false);
  const windowHeaderWithProps = React.cloneElement(windowHeader, {
    active: active,
  });
  return (
    <>
      <Window
        onClick={onClick}
        className={`block justify-start ${className}`}
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
      >
        {windowHeaderWithProps}
        {children}
      </Window>
      <Separator />
    </>
  );
};

export default ListItemBase;
