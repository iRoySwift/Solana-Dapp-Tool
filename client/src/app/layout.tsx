import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import WithWalletProvider from "@/components/wallet/WithWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Solana Tools",
    description: "Dapp Tools",
};

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "zh" }];
}

export default function RootLayout({
    children,
    modal,
    params,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
    params: { lang: string };
}>) {
    return (
        <html lang={params.lang} suppressHydrationWarning={true}>
            <body>
                <WithWalletProvider>
                    <ThemeProvider>
                        <Toaster />
                        <>
                            <div id="modal-root" />
                            {children}
                            {modal}
                        </>
                    </ThemeProvider>
                </WithWalletProvider>
            </body>
        </html>
    );
}
