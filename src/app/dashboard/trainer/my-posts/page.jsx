"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trash2, MessageSquareText } from "lucide-react";
import DeleteConfirmModal from "@/components/dashboard/trainer/DeleteConfirmModal";

export default function MyPosts() {
  // ডামি ডাটা - আপনার ডাটাবেস থেকে আসবে
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Importance of Yoga in Daily Life",
      date: "June 18, 2026",
      desc: "Yoga is not just exercise...",
    },
    {
      id: 2,
      title: "Nutrition Tips for Beginners",
      date: "June 15, 2026",
      desc: "Eating healthy is simple...",
    },
  ]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = () => {
    setPosts(posts.filter((p) => p.id !== selectedPost.id));
    setIsDeleteOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold">My Forum Posts</h1>
        <p className="text-white/50 text-sm">
          Manage your contributions to the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <MessageSquareText size={20} />
                  <span className="text-xs uppercase tracking-widest text-white/30">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm line-clamp-3">
                  {post.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedPost(post);
                  setIsDeleteOpen(true);
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-600/20 hover:text-red-500 transition-all"
              >
                <Trash2 size={16} /> Delete Post
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
