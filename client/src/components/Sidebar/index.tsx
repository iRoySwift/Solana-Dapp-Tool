"use client";
import useLocaleRoute from "@/hooks/useLocaleRoute";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/routes";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

interface Props {}
const SideBar: React.FC<Props> = () => {
    const pathname = usePathname();
    const params = useParams();
    const t = useI18n();
    const localeLink = useLocaleRoute();
    return (
        <div className="h-screen w-fit bg-background-nav p-6  text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-col gap-6">
                {sidebarLinks.map(link => {
                    const isActive =
                        pathname
                            .replace(`/${params.lang}`, "/")
                            .replace("//", "/") == link.route;
                    return (
                        <Link
                            className={cn(
                                "flex items-center justify-start gap-4 rounded-lg p-4",
                                {
                                    "bg-primary": isActive,
                                }
                            )}
                            key={link.id}
                            href={localeLink(link.route)}>
                            <div className="flex h-6 w-6">{link.icon}</div>
                            <p className="text-lg font-semibold max-lg:hidden">
                                {t(link.id)}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default SideBar;
