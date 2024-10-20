import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {}
const SkeletonTableRow: React.FC<Props> = () => {
    return (
        <>
            {Array(5)
                .fill(0)
                .map(token => (
                    <TableRow
                        key={token.symbol}
                        className="group border-border">
                        <TableCell className="font-medium">
                            <div className="flex flex-row items-center gap-2">
                                <div className="overflow-hidden rounded-full">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="flex flex-col">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <div className="mt-2 text-slate-400">
                                        <Skeleton className="h-2 w-[50px]" />
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                            <div className="test flex items-center justify-between gap-4">
                                <Skeleton className="h-4 w-[100px]" />
                                <div className="test flex flex-1 items-center justify-between">
                                    {token.totalUiAmount}
                                    <div className="hidden flex-row gap-2 group-hover:flex">
                                        <Button>Swap</Button>
                                        <Button>Send</Button>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
        </>
    );
};
export default SkeletonTableRow;
