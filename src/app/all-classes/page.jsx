"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@heroui/react";

export default function AllClassesPage() {
  const [loading, setLoading] = useState(false);

  // ডাইনামিক ক্যাটাগরি লিস্ট (এটি পরে আপনার ডাটাবেস থেকে ফেচ করবেন)
  const categories = ["Yoga", "Cardio", "Strength", "HIIT", "Zumba"];

  // ডামি ডেটা (পরে ব্যাকএন্ড থেকে ফেচ করবেন)
  const classes = [
    { id: 1, name: "Power Yoga", trainer: "John Doe", category: "Yoga" },
    { id: 2, name: "HIIT Blast", trainer: "Sarah Smith", category: "HIIT" },
    {
      id: 3,
      name: "Core Strength",
      trainer: "Mike Ross",
      category: "Strength",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Explore All Classes</h1>
          <p className="text-white/50">
            Browse through our expert-led fitness sessions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#111111] p-4 rounded-3xl border border-white/10">
          <Input
            placeholder="Search by class name..."
            startContent={<Search size={18} className="text-white/50" />}
            className="flex-1"
          />

          <div className="relative w-full md:w-64">
            <Filter
              size={18}
              className="absolute left-3 top-3.5 text-white/50 z-10"
            />
            <select className="w-full bg-[#111111] text-white font-medium rounded-xl py-3 pl-10 pr-4 outline-none text-sm appearance-none cursor-pointer border border-white/10 hover:border-white/20 transition-all">
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat.toLowerCase()}
                  className="bg-[#111111]"
                >
                  {cat}
                </option>
              ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute right-4 top-4 pointer-events-none text-white/50">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#111111] border border-white/10 p-6 rounded-3xl hover:border-red-600/50 transition-all group"
              >
                <div className="h-48 bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-white/20">
                  [Image Placeholder]
                </div>
                <h3 className="text-xl font-bold mb-2">{cls.name}</h3>
                <p className="text-white/50 text-sm mb-6">
                  Trainer: {cls.trainer} • {cls.category}
                </p>
                <Link
                  href={`/classes/${cls.id}`}
                  className="block w-full py-3 text-center border border-white/10 hover:bg-red-600 hover:border-red-600 rounded-xl font-bold transition-all"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-10">
          <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-all">
            Previous
          </button>
          <button className="px-4 py-2 bg-red-600 rounded-lg text-sm font-bold">
            1
          </button>
          <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
