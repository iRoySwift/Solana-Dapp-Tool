import { cn } from "@iroy/ui/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const PageHeader: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <section className={cn("border-grid border-b", className)} {...props}>
      <div className="border-grid container-wrapper">
        <div className="container">{children}</div>
      </div>
    </section>
  );
};
export default PageHeader;
