"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  CalendarCheck,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client"; // আপনার সেশন হ্যান্ডলারের পাথ এখানে দিন

export default function AdminOverview() {
  // সেশন থেকে ইউজার ডেটা নেওয়া
  const { data: session } = authClient.useSession();
  const admin = session?.user;

  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Classes",
      value: "48",
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Booked Classes",
      value: "892",
      icon: CalendarCheck,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
        <p className="text-white/50 text-sm">
          Welcome back, {admin?.name || "Admin"}.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-[#111111] border border-white/10"
          >
            <div
              className={`p-3 rounded-2xl w-fit ${stat.bg} ${stat.color} mb-4`}
            >
              <stat.icon size={24} />
            </div>
            <h3 className="text-white/50 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Admin Profile Section - Dynamic Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-8 rounded-3xl bg-[#111111] border border-white/10 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-24 h-24 rounded-full ring-2 ring-blue-600/50 p-1 relative overflow-hidden">
          {admin?.image ? (
            <Image
              src={admin.image}
              alt={admin.name || "Admin"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
              {admin?.name?.charAt(0) || "A"}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-white">
              {admin?.name || "System Admin"}
            </h3>
            <span className="flex items-center gap-1 px-3 py-1 bg-blue-600/10 text-blue-500 border border-blue-600/20 rounded-full text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Admin
            </span>
          </div>
          <p className="text-white/50 mt-1">
            {admin?.email || "admin@fitnesspro.com"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
