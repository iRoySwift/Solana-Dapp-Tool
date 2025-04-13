import { cn } from "@iroy/ui/lib/utils";
import React from "react";

interface Props {}
const PageHeaderHeading = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:leading-[1.1]",
        className
      )}
      {...props}>
      {children}
    </div>
  );
};
export default PageHeaderHeading;
