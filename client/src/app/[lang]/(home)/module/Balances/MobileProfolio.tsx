import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Plus, Send } from "lucide-react";
import React from "react";

interface Props {
    isLoading: boolean;
}
const MobileProfolio: React.FC<Props> = ({ isLoading }) => {
    return (
        <div className="flex flex-col items-center sm:hidden">
            <div className="flex h-[116px] w-[360px] items-center justify-center rounded-2xl bg-gradient-to-b from-card text-5xl">
                {isLoading ? (
                    <Skeleton className="h-10 w-[250px]" />
                ) : (
                    "$1000.0"
                )}
            </div>

            <div className="mt-5 flex h-16 w-full flex-row gap-2">
                <Button
                    className="h-full flex-1 rounded-2xl bg-card"
                    variant="secondary">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Send className="text-primary" />
                        <div className="text-slate-400">Send</div>
                    </div>
                </Button>
                <Button
                    className="h-full flex-1 rounded-2xl bg-card"
                    variant="secondary">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Plus className="text-primary" />
                        <div className="text-slate-400">Receive</div>
                    </div>
                </Button>
                <Button
                    className="h-full flex-1 rounded-2xl bg-card"
                    variant="secondary">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <DollarSign className="text-primary" />
                        <div className="text-slate-400">Buy</div>
                    </div>
                </Button>
            </div>
        </div>
    );
};
export default MobileProfolio;
