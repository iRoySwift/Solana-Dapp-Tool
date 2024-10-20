"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, QrCode } from "lucide-react";
import React, { useState } from "react";
import Profolio from "./Profolio";
import MobileProfolio from "./MobileProfolio";

interface Props {}
const Balances: React.FC<Props> = () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <Profolio isLoading={isLoading} />
            <MobileProfolio isLoading={isLoading} />
        </>
    );
};
export default Balances;
