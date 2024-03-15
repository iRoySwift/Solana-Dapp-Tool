import Logo from "./Logo";
import MiniLogo from "./MiniLogo";

// ==============================|| MAIN LOGO ||============================== //

import React from "react";

interface Props {
    drawer?: boolean;
}
const LogoSelection: React.FC<Props> = ({ drawer }) => {
    return (
        <div
            className={`flex h-[60px] items-center  overflow-hidden p-2 ${drawer ? "pl-6" : "justify-center"}`}>
            {drawer ? <Logo /> : <MiniLogo />}
        </div>
    );
};
export default LogoSelection;
