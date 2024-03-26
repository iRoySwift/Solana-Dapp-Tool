import { iCluster } from "@/store/solana";
import React from "react";

interface Props {
    currentCluster: iCluster;
    cluster: iCluster;
    handleClick: (v: iCluster) => void;
    children: React.ReactNode;
}
const LinkButton: React.FC<Props> = props => {
    const { currentCluster, cluster, handleClick, children } = props;
    return (
        <a
            className={`cursor-pointer rounded-md border p-2 pl-3 text-center ${cluster == currentCluster ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent hover:text-accent-foreground"}`}
            onClick={() => handleClick(cluster)}>
            {children}
        </a>
    );
};
export default LinkButton;
