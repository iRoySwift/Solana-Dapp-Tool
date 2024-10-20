import React from "react";
import { iToken } from ".";
import Image from "next/image";
import { Settings2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonItem from "./SkeletonItem";

interface Props {
    tokens: iToken[];
    isLoading: boolean;
}
const MobileList: React.FC<Props> = props => {
    const { tokens, isLoading } = props;
    return (
        <div className="flex flex-col gap-2 sm:hidden">
            {isLoading ? (
                <SkeletonItem />
            ) : (
                tokens.map(token => (
                    <div
                        key={token.symbol}
                        className="flex justify-between rounded-2xl border bg-card px-4 py-4">
                        <div className="flex items-center gap-2">
                            <div className="overflow-hidden rounded-full">
                                <Image
                                    src={token.imageUri}
                                    width={40}
                                    height={40}
                                    alt="Logo"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div>
                                    {token.name}({token.symbol})
                                </div>
                                <div className="text-slate-400">
                                    {token.price.price * token.totalUiAmount}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div>{token.totalUiAmount}</div>
                            <div className="text-slate-400">
                                {token.price.price}
                            </div>
                        </div>
                    </div>
                ))
            )}
            {!isLoading && (
                <div className="flex justify-center gap-2 px-4 py-2">
                    <Settings2 /> Manage Token List
                </div>
            )}
        </div>
    );
};
export default MobileList;
