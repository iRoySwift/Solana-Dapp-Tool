import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { i18n, Locale } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Solana Tools",
    description: "Dapp Tools",
};

export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
    children,
    modal,
    params,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
    params: { lang: Locale };
}>) {
    return (
        <html lang={params.lang}>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <Toaster />
                    <>
                        <div id="modal-root" />
                        {children}
                        {modal}
                    </>
                </ThemeProvider>
            </body>
        </html>
    );
}
