import LogoSelection from "@/components/Logo";
import React from "react";
import Content from "./Content";

interface Props {
    drawer?: boolean;
}
const Drawer: React.FC<Props> = ({ drawer }) => {
    return (
        <nav className="z-50">
            <div
                className={`fixed h-full  border-r bg-background ${drawer ? "w-[260px] " : "w-[60px] shadow"}`}>
                <LogoSelection drawer={drawer} />
                <Content drawer={drawer} />
            </div>
        </nav>
    );
};
export default Drawer;
