"use client";
import { AlignJustify } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/routes";
import Logo from "../Logo/Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {}
const MobileNav: React.FC<Props> = () => {
    const pathname = usePathname();

    return (
        <section className="flex-center">
            <Sheet>
                <SheetTrigger asChild>
                    <div className="flex-center h-10 w-10 cursor-pointer sm:hidden">
                        <AlignJustify size={32} strokeWidth={2} />
                    </div>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="border-none bg-background-nav">
                    <div className="flex flex-col ">
                        <Link href="/">
                            <Logo />
                        </Link>
                        <div className="h-[calc(100vh-20px)] overflow-y-scroll">
                            <SheetClose asChild>
                                <div className="flex h-full flex-col gap-6 pt-16">
                                    {sidebarLinks.map(link => {
                                        const isActive =
                                            pathname === link.route;
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
                                                <div className="flex h-6 w-6">
                                                    {link.icon}
                                                </div>
                                                <p className="text-lg font-semibold ">
                                                    {link.label}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};
export default MobileNav;
