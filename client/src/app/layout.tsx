import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
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