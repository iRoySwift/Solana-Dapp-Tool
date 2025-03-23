import { CardsDemo } from "@/components/cards";
import ThemeCustomizer from "@/components/theme-customizer";
import ThemeWrapper from "@/components/theme-customizer/theme-wrapper";
import { Lang } from "@iroy/i18n/config";
import { getI18n } from "@iroy/i18n";
import { cn } from "@iroy/ui/lib/utils";
import React from "react";

const PageHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("border-grid border-b", className)} {...props}>
    <div className="container-wrapper">
      <div className="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
        {children}
      </div>
    </div>
  </section>
);

const PageHeaderHeading = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
      className
    )}
    {...props}>
    {children}
  </div>
);

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

const PageActions = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

interface Props {
  params: {
    lang: Lang;
  };
}
const Home: React.FC<Props> = async ({ params }) => {
  const { lang } = await params;
  const $t = await getI18n<any>(lang);
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{$t("home.home")}</PageHeaderHeading>
        <PageHeaderDescription>{$t("home.description")}</PageHeaderDescription>
        <PageActions>
          <ThemeCustomizer />
        </PageActions>
      </PageHeader>
      <div className="container-wrapper py-6">
        <section id="themes" className="container scroll-mt-20">
          <ThemeWrapper>
            <CardsDemo />
          </ThemeWrapper>
        </section>
      </div>
    </>
  );
};
export default Home;
