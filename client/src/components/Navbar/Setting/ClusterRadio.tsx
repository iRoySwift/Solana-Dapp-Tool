import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { iCluster } from "@/store/solana";
import React from "react";

interface Props {
    currentCluster: iCluster;
    cluster: iCluster;
    handleClick: (v: iCluster) => void;
    children: React.ReactNode;
}
const ClusterRadio: React.FC<Props> = props => {
    const { currentCluster, cluster, handleClick, children } = props;
    const a = (a: string) => {};
    return (
        <div
            className={`flex cursor-pointer items-center justify-between rounded-md p-2 py-3 ${cluster == currentCluster ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent hover:text-accent-foreground"}`}>
            <div className="w-40">{children}</div>
            <div>875ms</div>
            {/* <Checkbox
                className="rounded-full bg-secondary"
                onChange={() => {}}
            /> */}
            <RadioGroupItem value="default" />
        </div>
    );
};
export default ClusterRadio;
