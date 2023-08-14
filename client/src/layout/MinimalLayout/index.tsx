import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}
const MinimalLayout: React.FC<Props> = () => {
    return (
        <>
            <Outlet />
        </>
    );
};
export default MinimalLayout;
