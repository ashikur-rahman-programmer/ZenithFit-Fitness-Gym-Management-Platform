"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Calendar,
  ArrowRight,
  Clock,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Pagination from "./Pagination";

const ForumClientCommunication = ({ initialPosts, totalPages }) => {
  const AVATAR_COLORS = [
    "bg-red-600",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-600",
    "bg-blue-600",
    "bg-violet-600",
    "bg-pink-600",
  ];
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");
  const getAvatarColor = (name) =>
    AVATAR_COLORS[name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0];
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

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialPosts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{
                borderColor: "rgba(239,68,68,0.35)",
                boxShadow:
                  "0 0 0 1px rgba(239,68,68,0.12), 0 20px 60px rgba(0,0,0,0.5)",
              }}
              className="group flex flex-col bg-white/[0.025] border border-white/[0.07] rounded-[18px] overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                  src={post.image || "/placeholder-forum.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-10" />
                {/* category */}
                {post.category && (
                  <span className="absolute top-3.5 left-3.5 z-20 bg-red-500/15 border border-red-500/30 text-red-300 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-3.5 p-5 pt-4">
                {/* Author row */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`${getAvatarColor(post.authorName)} w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
                  >
                    {getInitial(post.authorName)}
                  </div>
                  <span className="text-[12px] text-white/40 font-medium flex-1 truncate">
                    {post.authorName}
                  </span>
                  <span className="text-[11px] text-white/20 shrink-0">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold leading-snug tracking-tight text-white/90 group-hover:text-white transition-colors duration-200 m-0">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-[13.5px] text-white/35 leading-relaxed line-clamp-2 m-0 flex-1">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.05] mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[12px] text-white/22">
                      <ThumbsUp size={12} strokeWidth={1.8} />
                      {post.likes?.length || 0}
                    </span>
                    <span className="flex items-center gap-1.5 text-[12px] text-white/22">
                      <MessageSquare size={12} strokeWidth={1.8} />
                      {post.comments?.length || 0}
                    </span>
                  </div>
                  <Link
                    href={`/community/${post._id}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.05em] uppercase text-red-500 hover:gap-2.5 transition-all duration-200 no-underline"
                  >
                    Read <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ForumClientCommunication;
