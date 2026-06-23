"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Calendar, ArrowRight, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";

const ForumClientCommunication = ({ initialPosts }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs">
            Community Pulse
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Expert Forum & Insights
          </h1>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialPosts.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group relative bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
            >
              {/* Image with subtle flare */}
              <div className="h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                <Image
                  src={post.image || "/placeholder-forum.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Area */}
              <div className="p-8 space-y-5">
                {/* Meta Tags */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md hover:text-red-500 transition-colors cursor-pointer">
                    <User size={12} className="text-red-500" />{" "}
                    {post.authorName}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                    <Calendar size={12} />{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-tight group-hover:text-red-500 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/20 flex items-center gap-1.5 uppercase">
                    <TrendingUp size={12} /> Trending Post
                  </span>
                  <Link
                    href={`/community/${post._id}`}
                    className="inline-flex items-center gap-2 text-red-500 font-black text-[12px] uppercase tracking-widest hover:gap-3 transition-all duration-300"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Glowing Corner Effect */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-red-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumClientCommunication;
