"use client";
import Link from "next/link";
import React from "react";
import Logo from "../Logo/Logo";
import ModeToggle from "../Theme/ModeToggle";
import MiniLogo from "../Logo/MiniLogo";
import MobileNav from "./MobileNav";
import { useParams } from "next/navigation";
import Wallet from "@/components/wallet/Wallet";
import Setting from "./Setting";

interface Props {}
const Navbar: React.FC<Props> = props => {
    const { lang } = useParams();
    return (
        <div className="flex-between bg-background px-6 py-4">
            <Link href={`/${lang}`}>
                <div className="max-sm:hidden">
                    <Logo />
                </div>
                <div className="flex-center h-10 w-10 sm:hidden">
                    <MiniLogo />
                </div>
            </Link>
            <div className="flex-between gap-5">
                <ModeToggle />
                <Setting />
                <Wallet />
                <MobileNav />
            </div>
        </div>
    );
};
export default Navbar;
