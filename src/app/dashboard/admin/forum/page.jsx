"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Trash2, FileText, User } from "lucide-react";
import { toast } from "react-toastify"; // অথবা আপনার ব্যবহৃত টোস্ট লাইব্রেরি

export default function ManageForumPosts() {
  // ডামি ডেটা - আপনার ডাটাবেস থেকে Fetch করা ডেটা এখানে বসবে
  const [posts, setPosts] = useState([
    {
      id: "p1",
      author: "Ashikur Rahman",
      title: "Top 5 Yoga Poses for Beginners",
      date: "June 18, 2026",
    },
    {
      id: "p2",
      author: "Jane Doe",
      title: "Why Cardio is Essential",
      date: "June 17, 2026",
    },
    {
      id: "p3",
      author: "Spammer123",
      title: "Cheap Watches for Sale!",
      date: "June 15, 2026",
    },
  ]);

  const handleDelete = (id) => {
    // এখানে আপনার API কল হবে পোস্টটি ডাটাবেস থেকে ডিলিট করার জন্য
    setPosts(posts.filter((post) => post.id !== id));
    toast.success("Post has been removed from the platform.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Forum Posts</h1>
        <p className="text-white/50 text-sm">
          Review and moderate all community contributions.
        </p>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Author</th>
                <th className="px-6 py-5">Post Title</th>
                <th className="px-6 py-5">Date Posted</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-5 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-white/5 flex items-center justify-center">
                      <User size={14} className="text-white/50" />
                    </div>
                    <span className="text-white/80 font-medium">
                      {post.author}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-white font-semibold">
                    {post.title}
                  </td>
                  <td className="px-6 py-5 text-white/50">{post.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all text-sm font-bold"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
