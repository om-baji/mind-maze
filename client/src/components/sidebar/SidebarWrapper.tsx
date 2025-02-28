import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Navbar from "../Navbar";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-w-[100%]">
            <SidebarProvider>
                <div className="flex">
                    <div className="hidden md:block w-64 border-r">
                        <AppSidebar />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className='w-full'>
                            <Navbar />
                        </div>
                        <div className="flex-1 p-4 overflow-auto bg-gray-50">{children}</div>
                    </div>
                </div>
            </SidebarProvider>
        </div>

    );
};

export default SidebarWrapper;