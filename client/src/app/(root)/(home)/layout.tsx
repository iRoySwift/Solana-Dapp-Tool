import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";
import React from "react";

interface Props {
    children: React.ReactNode;
}
const HomeLayout: React.FC<Props> = ({ children }) => {
    return (
        <main className="relative">
            <Navbar />
            <div className="flex">
                <SideBar />
                <section className="min-h-screen w-full flex-1 p-6 max-md:pb-14  sm:px-14">
                    {children}
                </section>
            </div>
        </main>
    );
};
export default HomeLayout;
