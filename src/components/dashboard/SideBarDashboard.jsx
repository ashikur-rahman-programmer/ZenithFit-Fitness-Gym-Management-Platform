"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Users,
  UserCog,
  BookOpen,
  PlusCircle,
  FileText,
  DollarSign,
  Home,
  Heart,
  Briefcase,
  LogOut,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SideBarDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathName = usePathname();

  const dashboardItems = {
    admin: [
      { icon: LayoutGrid, label: "Overview", path: "/dashboard/admin" },
      { icon: Users, label: "Manage Users", path: "/dashboard/admin/users" },
      {
        icon: UserCog,
        label: "Applied Trainers",
        path: "/dashboard/admin/trainers-application",
      },
      {
        icon: Briefcase,
        label: "Manage Trainers",
        path: "/dashboard/admin/trainers",
      },
      {
        icon: BookOpen,
        label: "Manage Classes",
        path: "/dashboard/admin/classes",
      },
      { icon: FileText, label: "Forum Posts", path: "/dashboard/admin/forum" },
      {
        icon: DollarSign,
        label: "Transactions",
        path: "/dashboard/admin/transactions",
      },
    ],
    trainer: [
      { icon: LayoutGrid, label: "Overview", path: "/dashboard/trainer" },
      {
        icon: PlusCircle,
        label: "Add Class",
        path: "/dashboard/trainer/add-class",
      },
      {
        icon: BookOpen,
        label: "My Classes",
        path: "/dashboard/trainer/my-classes",
      },
      {
        icon: PlusCircle,
        label: "Add Forum",
        path: "/dashboard/trainer/add-forum",
      },
      {
        icon: FileText,
        label: "My Posts",
        path: "/dashboard/trainer/my-posts",
      },
    ],
    user: [
      { icon: LayoutGrid, label: "Overview", path: "/dashboard/user" },
      {
        icon: BookOpen,
        label: "Booked Classes",
        path: "/dashboard/user/booked-classes",
      },
      {
        icon: Briefcase,
        label: "Apply as Trainer",
        path: "/dashboard/user/apply-trainer",
      },
      { icon: Heart, label: "My Favorites", path: "/dashboard/user/favorites" },
    ],
  };

  const role = user?.role || "user";
  const navItems = dashboardItems[role] || dashboardItems.user;

  const renderNavLinks = () => (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition-colors ${
            pathName === item.path
              ? "bg-red-600 text-white"
              : "text-white/70 hover:bg-white/5 hover:text-white"
          }`}
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#111111] border-b border-white/10 sticky top-0 z-50">
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="ZenithFit Logo"
            width={100}
            height={30}
            className="object-contain"
          />
        </Link>
        <Button
          variant="flat"
          isIconOnly
          onPress={() => setIsOpen(true)}
          className="text-white bg-white/10"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#0a0a0a] z-[100] transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src="/logo.jpg" alt="Logo" width={120} height={35} />
          </Link>
          <Button
            variant="flat"
            isIconOnly
            onPress={() => setIsOpen(false)}
            className="text-white bg-white/10"
          >
            <X />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">{renderNavLinks()}</div>

        <div className="p-4 border-t border-white/10 bg-[#111111]">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 px-4 py-3 text-white/50 hover:text-white mb-2"
          >
            <Home className="size-5" /> Back to Home
          </Link>
          <button
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/";
                  },
                },
              });
            }}
            className="flex items-center gap-4 w-full px-4 py-3 text-red-500 bg-red-600/10 rounded-xl"
          >
            <LogOut className="size-5" /> Logout
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-white/10 bg-[#111111] text-white sticky top-0">
        <div className="p-6">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">{renderNavLinks()}</div>
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:text-white mb-2"
          >
            <Home className="size-5" /> Back to Home
          </Link>
          <button
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/";
                  },
                },
              });
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-600/10 w-full transition-colors"
          >
            <LogOut className="size-5" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBarDashboard;
