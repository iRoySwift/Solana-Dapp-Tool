import type { Metadata } from "next";
import React from "react";
import MainLayout from "@/app/(tutorial)/MainLayout";

export const metadata: Metadata = {
    title: "Solana Tutorial",
    description: "Solana base tutorial",
};

interface Props {
    children: React.ReactNode;
}
const TutorialLayout: React.FC<Props> = props => {
    const { children } = props;
    return (
        <main>
            <MainLayout>{children}</MainLayout>
        </main>
    );
};
export default TutorialLayout;
