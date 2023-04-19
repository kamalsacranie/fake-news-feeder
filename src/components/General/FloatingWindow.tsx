import {
  EventHandler,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { WindowBar, WindowBarProps } from "../WindowBar";
import { WindowContent, Window } from "react95";
import { Draggable } from "./Draggable";
import { DivProps } from "../../types";

export const Float = (props: DivProps) => {
  return (
    <div className="relative w-screen h-screen pointer-events-none flex align-middle items-center justify-center">
      <div className="absolute z-20 pointer-events-auto">
        <div className="h-fit">{props.children}</div>
      </div>
    </div>
  );
};

export default function FloatingWindow(
  props: WindowBarProps & {
    barButtons?: ReactNode;
    closeButtonCallback?: EventHandler<SyntheticEvent>;
  }
) {
  return (
    <Float>
      <Window>
        <Draggable>
          <WindowBar callback={props.closeButtonCallback} {...props}>
            {props.barButtons}
          </WindowBar>
        </Draggable>
        <WindowContent>{props.children}</WindowContent>
      </Window>
    </Float>
  );
}
