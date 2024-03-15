import React from "react";
import IconButton from "@/components/ui/Button/IconButton";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { useDrawerStore } from "@/store";

interface Props {
    drawer?: boolean;
}
const Header: React.FC<Props> = ({ drawer }) => {
    const { openDrawer, closeDrawer } = useDrawerStore();
    return (
        <header
            className={`fixed z-50 flex h-[60px] border-b border-tw-border bg-white ${drawer ? "left-[260px] w-[calc(100%-260px)]" : "left-[60px] w-[calc(100%-60px)]"}`}>
            <div className="flex w-full items-center p-2">
                <IconButton disableRipple={false}>
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
                </IconButton>
            </div>
        </header>
    );
};
export default Header;
