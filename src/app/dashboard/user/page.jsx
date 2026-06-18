"use client";

import { authClient } from "@/lib/auth-client";
import {
  BookCheck,
  Heart,
  UserCircle,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserOverview() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const trainerStatus = "Rejected";
  const adminFeedback =
    "Your experience in Cardio is not enough as per our requirements.";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>

      {/* Stats Cards - Gradient Border & Subtle Glow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Total Booked Classes",
            value: "5",
            icon: BookCheck,
            color: "blue",
          },
          { title: "Total Favorites", value: "12", icon: Heart, color: "red" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent group"
          >
            <div className="relative p-6 rounded-[23px] bg-[#111111] overflow-hidden">
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 ${stat.color === "blue" ? "bg-blue-500/20" : "bg-red-500/20"} blur-3xl rounded-full`}
              />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/50 text-sm font-medium">
                    {stat.title}
                  </p>
                  <h2 className="text-4xl font-bold mt-2 text-white">
                    {stat.value}
                  </h2>
                </div>
                <div
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color === "blue" ? "text-blue-400" : "text-red-400"}`}
                >
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content - Profile & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-[#111111] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <UserCircle size={200} />
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-900/20">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
              <p className="text-white/50">{user?.email}</p>
              <div className="mt-3 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                  Verified User
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl bg-[#111111] border border-white/5"
        >
          <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
            <Briefcase size={18} className="text-red-500" />
            Application Status
          </h3>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 font-bold uppercase text-sm tracking-widest">
              {trainerStatus}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs italic">"{adminFeedback}"</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
