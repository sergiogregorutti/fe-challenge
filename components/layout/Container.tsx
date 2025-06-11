import React, { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  const containerClasses = clsx("p-6 w-full", className);

  return <div className={containerClasses}>{children}</div>;
};

export default React.memo(Container);
