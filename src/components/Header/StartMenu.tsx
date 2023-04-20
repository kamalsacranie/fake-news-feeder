import { Link } from "react-router-dom";
import { MenuList, MenuListItem, Separator } from "react95";
import { UseStateSet } from "../../types";

const StartMenu = ({ setOpen }: { setOpen: UseStateSet<boolean> }) => {
  return (
    <MenuList
      className="z-50 absolute left-0 top-full"
      onClick={() => setOpen(false)}
    >
      <Link to="/articles">
        <MenuListItem>
          <span role="img" aria-label="👨‍💻">
            👨‍💻
          </span>
          Articles
        </MenuListItem>
      </Link>
      <Link to="/topics">
        <MenuListItem>
          <span role="img" aria-label="📁">
            📁
          </span>
          Topics
        </MenuListItem>
      </Link>
      <Separator />
      <MenuListItem disabled>
        <span role="img" aria-label="🔙">
          🔙
        </span>
        Logout
      </MenuListItem>
    </MenuList>
  );
};

export default StartMenu;
