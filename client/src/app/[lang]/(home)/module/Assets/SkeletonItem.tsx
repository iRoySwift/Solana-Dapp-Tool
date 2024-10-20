import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}
const SkeletonItem: React.FC<Props> = () => {
    return (
        <>
            {new Array(5).fill(0).map((v, i) => (
                <div
                    key={i}
                    className="flex justify-between rounded-2xl border bg-card px-4 py-4">
                    <div className="flex items-center gap-2">
                        <div className="overflow-hidden rounded-full">
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div>
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div className="mt-2 text-slate-400">
                                <Skeleton className="h-2 w-[80px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <Skeleton className="h-4 w-[50px]" />
                        <div className="mt-2 text-slate-400">
                            <Skeleton className="h-2 w-[50px]" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default SkeletonItem;
