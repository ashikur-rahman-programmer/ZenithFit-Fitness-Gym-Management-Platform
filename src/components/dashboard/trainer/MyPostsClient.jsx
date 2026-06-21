"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trash2, MessageSquareText } from "lucide-react";
import DeleteConfirmModal from "@/components/dashboard/trainer/DeleteConfirmModal";
import { toast } from "react-toastify";

export default function MyPostsClient({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/${selectedPost._id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== selectedPost._id));
        toast.success("Post deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleteOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold">My Forum Posts</h1>
        <p className="text-white/50 text-sm">Manage your contributions.</p>
      </div>

      {/* পোস্ট লিস্ট বা এম্পটি স্টেট */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post._id}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4 text-red-500">
                    <MessageSquareText size={20} />
                    <span className="text-xs text-white/30">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-3">
                    {post.description}
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
      ) : (
        // এম্পটি স্টেট ডিজাইন
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-white/20">
            <MessageSquareText size={32} />
          </div>
          <h3 className="text-lg font-bold text-white">No Posts Found</h3>
          <p className="text-white/40 text-sm mt-1">
            You haven't shared any posts in the forum yet.
          </p>
        </motion.div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
