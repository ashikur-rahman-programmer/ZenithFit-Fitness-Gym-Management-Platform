"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookCheck, Heart, Briefcase, BadgeCheck } from "lucide-react";

export default function ClientOverview({ user, stats }) {
  const { trainerApp, booked, favorites } = stats;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Booked Classes"
          value={booked}
          icon={BookCheck}
          color="blue"
        />
        <StatCard
          title="Total Favorites"
          value={favorites}
          icon={Heart}
          color="red"
        />
      </div>

      {/* Main Content: Profile & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-[#111111] border border-white/5 flex items-center gap-6">
          <div className="w-20 h-20 relative rounded-2xl overflow-hidden shrink-0">
            <Image
              src={user?.image || "/default-avatar.png"} // ইমেজ না থাকলে একটি ডিফল্ট ইমেজ দিন
              alt={user?.name || "User"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
            <p className="text-white/50">{user?.email}</p>
            <div className="mt-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 flex items-center gap-1 w-fit">
                <BadgeCheck size={14} /> {user?.role || "User"}
              </span>
            </div>
          </div>
        </div>

        {/* Trainer Application Status */}
        <div className="p-8 rounded-3xl bg-[#111111] border border-white/5">
          <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
            <Briefcase size={18} className="text-red-500" /> Application Status
          </h3>

          {!trainerApp ? (
            <p className="text-white/40 text-sm">You haven't applied yet.</p>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${trainerApp.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}
                />
                <span className="text-white font-bold">
                  {trainerApp.status}
                </span>
              </div>

              {trainerApp.status === "Rejected" && trainerApp.feedback && (
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <p className="text-red-200/60 text-xs italic">
                    "{trainerApp.feedback}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="p-6 rounded-[24px] bg-[#111111] border border-white/10 flex justify-between items-center">
      <div>
        <p className="text-white/50 text-sm">{title}</p>
        <h2 className="text-4xl font-bold mt-2 text-white">{value || 0}</h2>
      </div>
      <Icon
        className={color === "blue" ? "text-blue-500" : "text-red-500"}
        size={28}
      />
    </div>
  );
}
