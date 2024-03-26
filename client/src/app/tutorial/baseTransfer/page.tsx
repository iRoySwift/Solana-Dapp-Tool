"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSolanaStore } from "@/store";
import { useConnection } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import React, { useEffect, useRef } from "react";

interface Props {}
const BaseTransfer: React.FC<Props> = () => {
    const connection = useRef<Connection>();
    const { cluster, customUrl } = useSolanaStore();

    useEffect(() => {
        let url = "";
        if (cluster == "custom") {
            url = customUrl;
            return;
        }
        url = clusterApiUrl(cluster as any);
        connection.current = new Connection(url, "confirmed");
    }, [cluster, customUrl]);

    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    钱包转账
                </h2>
                <div>
                    余额：<Button>查询</Button>
                </div>
                <div className="flex gap-2">
                    <Input className="w-40" placeholder="接收地址" />
                    <Input
                        className="w-20"
                        type="number"
                        min={0}
                        placeholder="数量"
                    />
                    <Button>转账</Button>
                </div>
            </div>
        </div>
    );
};
export default BaseTransfer;
