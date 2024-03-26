import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import queryString from "query-string";
import { useSolanaStore } from "@/store";
import { iCluster } from "@/store/solana";
import LinkButton from "./LinkButton";

interface Props {}
const ToggleCluster: React.FC<Props> = () => {
    const { cluster, customUrl, changeCluster, changeCustomUrl } =
        useSolanaStore();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (v: ChangeEvent<HTMLInputElement>) => {
        changeCustomUrl(v.target.value);
    };

    const handleClick = (v: iCluster) => {
        if (v === cluster) return;
        changeCluster(v);
        let query: any = { cluster: v, customUrl: "" };
        if (v === "mainnet-beta") {
            query = null;
        }
        if (v === "custom") {
            query.customUrl = customUrl;
        }
        router.replace(
            `${pathname}${query ? "?" + queryString.stringify(query) : ""}`
        );
    };
    return (
        <div className="flex flex-col gap-2">
            <LinkButton
                currentCluster={cluster}
                cluster={"mainnet-beta"}
                handleClick={handleClick}>
                Mainnet Beta
            </LinkButton>
            <LinkButton
                currentCluster={cluster}
                cluster={"testnet"}
                handleClick={handleClick}>
                Testnet
            </LinkButton>
            <LinkButton
                currentCluster={cluster}
                cluster={"devnet"}
                handleClick={handleClick}>
                Devnet
            </LinkButton>
            <LinkButton
                currentCluster={cluster}
                cluster={"custom"}
                handleClick={handleClick}>
                Custom RPC URL
            </LinkButton>
            {cluster == "custom" && (
                <Input value={customUrl} onChange={handleChange} />
            )}
        </div>
    );
};
export default ToggleCluster;
