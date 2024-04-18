"use client";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}
const SideBar: React.FC<Props> = () => {
    const pathname = usePathname();
    return (
        <div className="h-screen w-fit bg-background-nav  p-6 max-sm:hidden lg:w-[264px]">
            <div className="flex flex-col gap-6">
                {sidebarLinks.map(link => {
                    const isActive = pathname === link.route;
                    return (
                        <Link
                            className={cn(
                                "flex items-center gap-4 rounded-lg p-4",
                                {
                                    "bg-primary": isActive,
                                }
                            )}
                            key={link.id}
                            href={link.route}>
                            <div className="flex h-6 w-6">{link.icon}</div>
                            <p className="text-lg font-semibold max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default SideBar;
