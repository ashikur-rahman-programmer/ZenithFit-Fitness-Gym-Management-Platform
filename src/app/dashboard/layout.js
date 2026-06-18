"use client";

import SideBarDashboard from "@/components/dashboard/SideBarDashboard";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const DashboardLayout = ({ children }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <SideBarDashboard />

      <div className="flex-1 flex flex-col">
        {/* Dashboard Navbar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#111111]">
          <h2 className="text-lg font-semibold capitalize">
            {user?.role} Dashboard
          </h2>

          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium hidden sm:block">{user?.name}</span>

            {/* Profile Image with Fallback */}
            <div className="w-9 h-9 rounded-full ring-2 ring-red-600 overflow-hidden relative">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-red-600 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
