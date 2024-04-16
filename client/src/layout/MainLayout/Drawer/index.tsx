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
                className={`bg-background-nav  fixed h-full ${drawer ? "w-[260px] border-r border-border" : "w-[60px] shadow"}`}>
                <LogoSelection drawer={drawer} />
                <Content drawer={drawer} />
            </div>
        </nav>
    );
};
export default Drawer;
