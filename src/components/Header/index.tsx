import { AppBar, Toolbar } from "react95";
import StartAssembly from "./StartAssembly";

const Header = () => {
  return (
    <AppBar className="static">
      <Toolbar className="justify-between">
        <div className="relative inline">
          <StartAssembly />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
