import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, QrCode } from "lucide-react";
import React from "react";

interface Props {
    isLoading: boolean;
}
const Profolio: React.FC<Props> = ({ isLoading }) => {
    return (
        <Card className="max-sm:hidden">
            <div className="flex flex-row items-center justify-between p-6 ">
                <div className="flex flex-row gap-5">
                    <div className="flex  flex-row gap-2">
                        {isLoading ? (
                            <Skeleton className="h-10 w-10 rounded-full" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-red-200 text-2xl">
                                H
                            </div>
                        )}
                        <div>
                            <div className="text-xs text-slate-400">
                                Total portfolio value
                            </div>
                            {isLoading ? (
                                <Skeleton className="h-4 w-[250px]" />
                            ) : (
                                <div className="text-xl">$100</div>
                            )}
                        </div>
                    </div>
                    <Separator className="h-auto" orientation="vertical" />
                    <div className="flex flex-col">
                        <div className="text-xs text-slate-400">
                            Main Wallet
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div>HnBF...5wMDv</div>
                            <Copy size={14} />
                            <QrCode size={14} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary">Receive</Button>
                    <Button variant="secondary">Send</Button>
                </div>
            </div>
        </Card>
    );
};
export default Profolio;
