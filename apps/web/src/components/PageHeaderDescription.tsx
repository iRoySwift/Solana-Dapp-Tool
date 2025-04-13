import { cn } from "@iroy/ui/lib/utils";

const PageHeaderDescription = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-foreground max-w-2xl text-lg font-light", className)}
    {...props}>
    {children}
  </div>
);

export default PageHeaderDescription;
