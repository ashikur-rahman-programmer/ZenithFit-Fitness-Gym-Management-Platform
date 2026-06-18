"use client";

import SideBarDashboard from "@/components/dashboard/SideBarDashboard";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const DashboardLayout = ({ children }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar - এটি মোবাইল এবং ডেস্কটপ দুই ক্ষেত্রেই রেসপন্সিভ */}
      <SideBarDashboard />

      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Desktop Navbar */}
        <header className="hidden lg:flex h-16 border-b border-white/10 items-center justify-between px-8 bg-[#111111]">
          <h2 className="text-lg font-semibold capitalize">
            {user?.role || "User"} Dashboard
          </h2>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium">{user?.name}</span>
            <div className="w-9 h-9 rounded-full ring-2 ring-red-600 overflow-hidden relative bg-red-600 flex items-center justify-center font-bold">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                user?.name?.charAt(0) || "U"
              )}
            </div>
          </div>
        </header>

        {/* Content Container: 
            ডেস্কটপে একটি নির্দিষ্ট ম্যাক্সিমাম উইডথ (1600px) সেট করা হয়েছে, 
            যাতে কন্টেন্ট অগোছালো না দেখায়। মোবাইলে এটি ফুল স্ক্রিন থাকবে।
        */}
        <main className="flex-1 p-4 md:p-8 w-full">
          <div className="max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
