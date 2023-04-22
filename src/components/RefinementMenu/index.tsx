import { useEffect, useRef, useState } from "react";
import { TabBody } from "react95";
import RefinementForm from "./RefinementForm";
import SideTab from "./SideTab";
import SideTabs from "./SideTabs";

const RefinementMenu = () => {
  const formDiv = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (translateX === 0) {
      setTranslateX(formDiv.current?.clientWidth || -4);
    } else {
      setTranslateX(0);
    }
  }, [openMenu]);

  return (
    <div
      className="fixed z-20 flex top-16 right-0"
      style={{
        transform: `translateX(${translateX + 4}px)`,
      }}
    >
      <SideTabs
        className="h-fit"
        onClick={() => setOpenMenu(!openMenu)}
        value={0}
      >
        <SideTab value={0}>Refine</SideTab>
      </SideTabs>
      <TabBody ref={formDiv}>
        <RefinementForm />
      </TabBody>
    </div>
  );
};

export default RefinementMenu;
