import { useState } from "react";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";

const StartAssembly = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StartButton open={open} setOpen={setOpen} />
      {open && <StartMenu setOpen={setOpen} />}
    </>
  );
};

export default StartAssembly;
