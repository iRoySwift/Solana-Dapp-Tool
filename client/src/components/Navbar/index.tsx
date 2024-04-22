import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../Logo/Logo";
import ModeToggle from "../Theme/ModeToggle";
import MiniLogo from "../Logo/MiniLogo";
import MobileNav from "./MobileNav";

interface Props {}
const Navbar: React.FC<Props> = props => {
    return (
        <div className="flex-between  bg-background-nav px-6 py-4">
            <Link href="/">
                <div className="max-sm:hidden">
                    <Logo />
                </div>
                <div className="flex-center h-10 w-10 sm:hidden">
                    <MiniLogo />
                </div>
            </Link>
            <div className="flex-between gap-5">
                <ModeToggle />
                <MobileNav />
            </div>
        </div>
    );
};
export default Navbar;
