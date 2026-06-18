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
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";
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
    <nav className="flex flex-col gap-1 p-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.path}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors w-full ${
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
      <div className="lg:hidden p-4 bg-[#111111]">
        <Button
          variant="flat"
          onPress={() => setIsOpen(true)}
          className="text-white"
        >
          Menu
        </Button>
      </div>

      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement="left">
        <Drawer.Content className="bg-[#111111] text-white">
          <Drawer.Header>Navigation</Drawer.Header>
          <Drawer.Body>{renderNavLinks()}</Drawer.Body>
        </Drawer.Content>
      </Drawer>

      {/* Main Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-white/10 bg-[#111111] text-white">
        {/* Header with Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="ZenithFit Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1">{renderNavLinks()}</div>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:text-white mb-2"
          >
            <Home className="size-5" /> Back to Home
          </Link>
          <button
            onClick={() => authClient.signOut()}
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
