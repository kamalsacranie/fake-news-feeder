import { Tabs, TabsProps } from "react95";

const SideTabs = ({ className, children, ...props }: TabsProps) => {
  return (
    <Tabs
      {...props}
      className={`-rotate-90 origin-top-right -scale-y-100 top-2 z-20 ${className}`}
    >
      {children}
    </Tabs>
  );
};

export default SideTabs;
