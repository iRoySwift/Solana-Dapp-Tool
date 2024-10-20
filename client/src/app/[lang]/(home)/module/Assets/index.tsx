"use client";
import React, { useState } from "react";
import List from "./List";
import MobileList from "./MobileList";
import { Card } from "@/components/ui/card";

export type iToken = {
    name: string;
    symbol: string;
    imageUri: string;
    price: {
        price: number;
        change: number;
    };
    totalUiAmount: number;
};

const tokens = [
    {
        name: "Solana",
        symbol: "SOL",
        decimals: 9,
        mint: "11111111111111111111111111111111",
        imageUri:
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
        accounts: [
            {
                pubkey: "HnBFEvF9o9JMRAUBFf3m5dMYKFBBPcTug8qn89w5wMDv",
                uiAmount: 0.232717211,
                amount: "232717211",
                delegation: null,
            },
        ],
        coingeckoId: "solana",
        verified: true,
        totalUiAmount: 0.232717211,
        standard: "native",
        actions: [
            {
                name: "send",
            },
        ],
        price: {
            price: 152.01,
            change: 0.9667444749461216,
            usdPrice: 152.01,
            usdChange: 0.9667444749461216,
            currency: "usd",
        },
        solPrice: {
            price: 1,
            change: 0,
        },
        swappable: true,
        onrampTokenId: "sol",
    },
    {
        name: "USDC",
        symbol: "USDC",
        decimals: 6,
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        imageUri:
            "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        accounts: [
            {
                pubkey: "2Vxwr99Uj9pHuKfiiXHuw9cq1pPadZQZuc1vAjD6tvSd",
                uiAmount: 992.739629,
                amount: "992739629",
                delegation: null,
                state: "initialized",
            },
        ],
        totalUiAmount: 992.739629,
        coingeckoId: "usd-coin",
        verified: true,
        standard: "spl-token",
        actions: [
            {
                name: "send",
            },
        ],
        price: {
            price: 1.00002958,
            change: -0.002557989768060084,
            usdPrice: 1.00002958,
            usdChange: 0.002557989768060084,
            volume24h: 636334945.4647213,
            volumeChange24h: 3.153639478343939,
            mc: 2814628250.243491,
            currency: "usd",
        },
        solPrice: {
            price: 0.0064622266882067856,
            change: 2.482514827608684,
        },
        swappable: true,
        onrampTokenId: "usdc_solana",
    },
];

interface Props {}
const Assets: React.FC<Props> = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <List tokens={tokens} isLoading={isLoading} />
            <MobileList tokens={tokens} isLoading={isLoading} />
        </>
    );
};
export default Assets;
