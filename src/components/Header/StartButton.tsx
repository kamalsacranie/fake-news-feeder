import { Button } from "react95";
import { UseStateSet } from "../../types";

const StartButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: UseStateSet<boolean>;
}) => {
  return (
    <Button onClick={() => setOpen(!open)} active={open} className="font-bold">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Logo_%281992-2001%29.svg/2368px-Windows_Logo_%281992-2001%29.svg.png"
        }
        alt="windows95 logo"
        className="mr-2 h-5"
      />
      Start
    </Button>
  );
};

export default StartButton;
