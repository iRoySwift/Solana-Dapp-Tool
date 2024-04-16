"use client";
import React from "react";
import Header from "./Header";
import Drawer from "./Drawer";
import { useDrawerStore } from "@/store";
import WithWalletProvider from "@/components/wallet/WithWalletProvider";

interface Props {
    children: React.ReactNode;
}
const MainLayout: React.FC<Props> = props => {
    const { children } = props;
    const { drawer } = useDrawerStore();

    return (
        <WithWalletProvider>
            <div className="flex min-h-screen w-full">
                <Header drawer={drawer} />
                <Drawer drawer={drawer} />
                <main
                    className={`mt-[60px] min-h-screen w-full ${drawer ? "ml-[260px]" : "ml-[60px]"}`}>
                    {children}
                </main>
            </div>
        </WithWalletProvider>
    );
};
export default MainLayout;
