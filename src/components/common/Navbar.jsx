"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { LogOut, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ZenithNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathName = usePathname();

  // Navbar-এর ভেতরেই চেক করুন:
  console.log("Current User Session:", session);

  if (pathName.includes("/dashboard")) return null;

  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/all-classes" },
    { name: "Community", href: "/community" },
  ];

  // রোল অনুযায়ী ড্যাশবোর্ড পাথ রিটার্ন করার ফাংশন
  const getDashboardPath = (role) => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "trainer") return "/dashboard/trainer";
    return "/dashboard/user";
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111111]/90 backdrop-blur-md"
    >
      <nav
        className="container mx-auto px-4 h-16 flex items-center justify-between"
        aria-label="Global"
      >
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="ZenithFit Home"
        >
          <Image
            src="/logo.jpg"
            alt="zenithfit logo"
            width={150}
            height={120}
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`font-medium transition-colors ${pathName === link.href ? "text-red-500" : "text-white/80 hover:text-red-500"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="px-6 py-2 text-sm font-semibold text-white border border-white/20 hover:border-red-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* ড্যাশবোর্ড আইকন বা টেক্সট লিংক */}
              <Link
                href={getDashboardPath(user?.role)}
                className="text-white/80 hover:text-red-500 flex items-center gap-1.5 font-medium transition-colors"
              >
                <LayoutDashboard size={18} />
                <span className="text-sm">Dashboard</span>
              </Link>

              {/* Custom Image Component */}
              <div className="w-9 h-9 rounded-full ring-2 ring-red-600 overflow-hidden cursor-pointer relative">
                <Image
                  src={user?.image || "/default-avatar.png"} // ইমেজ না থাকলে একটি ডিফল্ট ইমেজ পাথ দিন
                  alt={user?.name || "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>

              {/* লগআউট বাটন */}
              <button
                onClick={() => authClient.signOut()}
                className="text-white/80 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#111111] border-t border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Mobile Auth */}
              {!user ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <Link
                    href="/auth/login"
                    className="text-white py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-red-500 py-2 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                  {/* মোবাইল মেন্যুতে ইউজারের ইনফো এবং ড্যাশবোর্ড লিংক */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full ring-2 ring-red-600 overflow-hidden relative">
                      <Image
                        src={user?.image || "/default-avatar.png"}
                        alt={user?.name || "User"}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-white/50 capitalize">
                        {user?.role || "user"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={getDashboardPath(user?.role)}
                    className="text-white flex items-center gap-2 font-medium hover:text-red-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      authClient.signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-500 flex items-center gap-2 font-medium"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default ZenithNavbar;
