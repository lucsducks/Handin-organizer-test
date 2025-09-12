import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardFooter } from "./sections/DashboardFooter";
import { DashboardHeader } from "./sections/DashboardHeader";
import { DashboardSidebar } from "./sections/DashboardSidebar";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <DashboardHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex h-[calc(100vh)]">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main
          className={`flex-1 overflow-auto pt-16 transition-all duration-300 lg:pt-20 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}
        >
          <Outlet />
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
