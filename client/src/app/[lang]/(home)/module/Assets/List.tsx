"use client";
import React from "react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import PriceChange from "../PriceChange";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { iToken } from ".";
import { Card } from "@/components/ui/card";

interface Props {
    tokens: iToken[];
}
const List: React.FC<Props> = props => {
    const { tokens } = props;
    const t = useI18n();
    return (
        <Card className="p-6 max-sm:hidden">
            <h1 className="pb-6 text-2xl">{t("assets")}</h1>
            <Table>
                <TableCaption className="cursor-pointer">
                    + Add new assets
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Name</TableHead>
                        <TableHead className="w-[200px]">
                            Price/24h change
                        </TableHead>
                        <TableHead className="w-[100px]">Value</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tokens.map(token => (
                        <TableRow
                            key={token.symbol}
                            className="group border-border">
                            <TableCell className="font-medium">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="overflow-hidden rounded-full">
                                        <Image
                                            src={token.imageUri}
                                            width={40}
                                            height={40}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div>{token.name}</div>
                                        <div className="text-slate-400">
                                            {token.symbol}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {token.price.price}
                                    <PriceChange percent={token.price.change} />
                                </div>
                            </TableCell>
                            <TableCell>
                                {token.price.price * token.totalUiAmount}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-1 items-center justify-between">
                                        {token.totalUiAmount}
                                        <div className="hidden flex-row gap-2 group-hover:flex">
                                            <Button>Swap</Button>
                                            <Button>Send</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    variant="ghost"
                                                    size="icon">
                                                    <EllipsisVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuItem>
                                                    Buy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Stake
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    View in Explore
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
export default List;
