import React from "react";
import clsx from "clsx";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  const classes = clsx("text-[20px] font-bold text-brand mb-2", className);

  return <h3 className={classes}>{children}</h3>;
}
