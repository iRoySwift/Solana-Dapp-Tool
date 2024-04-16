import React from "react";
import IconButton from "@/components/headlessui/Button/IconButton";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { useDrawerStore } from "@/store";
import { ModeToggle } from "@/components/Theme/ModeToggle";
import Wallet from "@/components/wallet/Wallet";
import { Button } from "@/components/ui/button";
import Setting from "./Setting";

interface Props {
    drawer?: boolean;
}
const Header: React.FC<Props> = ({ drawer }) => {
    const { openDrawer, closeDrawer } = useDrawerStore();
    return (
        <header
            className={`bg-background-nav fixed z-50 flex h-[60px] border-b border-border ${drawer ? "left-[260px] w-[calc(100%-260px)]" : "left-[60px] w-[calc(100%-60px)]"}`}>
            <div className="flex w-full items-center justify-between p-2">
                <div>
                    <Button variant="outline" size="icon">
                        {drawer ? (
                            <ChevronDoubleLeftIcon
                                className="h-5 w-5"
                                onClick={closeDrawer}
                            />
                        ) : (
                            <ChevronDoubleRightIcon
                                className="h-5 w-5"
                                onClick={openDrawer}
                            />
                        )}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Setting />
                    <Wallet />
                </div>
            </div>
        </header>
    );
};
export default Header;
