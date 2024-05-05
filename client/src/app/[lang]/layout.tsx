import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";
import React from "react";

interface Props {
    children: React.ReactNode;
}
const HomeLayout: React.FC<Props> = props => {
    const { children } = props;
    return (
        <main className="relative flex h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
                <SideBar />
                <section className="h-[calc(100vh-100px)] w-full overflow-auto p-6  max-md:pb-14 sm:px-14">
                    {children}
                </section>
            </div>
        </main>
    );
};
export default HomeLayout;
