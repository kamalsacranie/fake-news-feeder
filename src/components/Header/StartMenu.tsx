import { Link } from "react-router-dom";
import { MenuList, MenuListItem, Separator } from "react95";
import { UseStateSet } from "../../types";

const StartMenuListItem = ({
  symbol,
  label,
  ariaLabel,
  disabled,
}: {
  symbol: string;
  label: string;
  ariaLabel?: string;
  disabled?: boolean;
}) => {
  return (
    <MenuListItem disabled={disabled}>
      <span role="img" aria-label={ariaLabel}>
        {symbol}
      </span>
      {label}
    </MenuListItem>
  );
};

const StartMenu = ({ setOpen }: { setOpen: UseStateSet<boolean> }) => {
  const closeMenue = () => setOpen(false);

  return (
    <>
      <div
        className="fixed z-10 inset-0 w-screen h-screen"
        onClick={closeMenue}
      />
      <MenuList className="z-50 absolute left-0 top-full">
        <Link onClick={closeMenue} to="/articles">
          <StartMenuListItem symbol="👨‍💻" label="Articles" />
        </Link>
        <Link onClick={closeMenue} to="/topics">
          <StartMenuListItem symbol="📂" label="Topics" />
        </Link>
        <Separator />
        <StartMenuListItem
          disabled
          label="Logout"
          symbol="🔙"
          ariaLabel="back-arrow"
        />
      </MenuList>
    </>
  );
};

export default StartMenu;
