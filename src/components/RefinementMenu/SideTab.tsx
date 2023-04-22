import { Tab, TabProps } from "react95";

const SideTab = ({ className, children, ...props }: TabProps) => {
  return (
    <Tab {...props} className="-scale-x-100 -scale-y-100">
      <div className="-scale-x-100">{children}</div>
    </Tab>
  );
};

export default SideTab;
