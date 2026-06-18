"use client";

import { motion } from "framer-motion";
import { Eye, User, Calendar, Clock, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BookedClasses() {
  const bookedClasses = [
    {
      id: 1,
      name: "Advanced Yoga",
      trainer: "John Doe",
      date: "20 June, 2026",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Strength Training",
      trainer: "Sarah Smith",
      date: "22 June, 2026",
      time: "05:00 PM",
    },
    {
      id: 3,
      name: "Cardio Blast",
      trainer: "Mike Ross",
      date: "24 June, 2026",
      time: "08:00 AM",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Booked Classes</h1>
        <p className="text-white/50 text-sm">
          Review and manage your upcoming schedule
        </p>
      </div>

      {/* Main Container with Gradient Border */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
        <div className="bg-[#111111] rounded-[23px] overflow-hidden">
          {/* টেবিল রেসপন্সিভ করার জন্য scrollable container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Class
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Trainer
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Schedule
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookedClasses.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <td className="px-6 py-5 font-semibold text-white whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-5 text-white/70 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-red-500" />{" "}
                        {item.trainer}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Calendar size={14} className="text-white/40" />{" "}
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Clock size={14} className="text-blue-500" />{" "}
                          {item.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/dashboard/user/booked-classes/${item.id}`}
                        >
                          <button className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/50 transition-all duration-300">
                            <Eye
                              size={16}
                              className="text-white group-hover:text-blue-400"
                            />
                          </button>
                        </Link>
                        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/5 hover:border-red-500/50 transition-all duration-300">
                          <Trash2
                            size={16}
                            className="text-white group-hover:text-red-400"
                          />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
