import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}
const Tutorial: React.FC<Props> = () => {
    return <Outlet />;
};
export default Tutorial;
