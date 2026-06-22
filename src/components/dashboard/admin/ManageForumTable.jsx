"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2, User, AlertTriangle, X, FileText } from "lucide-react";

export default function ManageForumTable({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/${selectedPostId}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== selectedPostId));
        toast.success("Post removed successfully");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const openModal = (id) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            {/* টেবিল হেড এখানে যোগ করা হয়েছে */}
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Author</th>
                <th className="px-6 py-5">Post Title</th>
                <th className="px-6 py-5">Date Posted</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-5 flex items-center gap-3">
                      <div className="size-8 rounded-full bg-white/5 flex items-center justify-center">
                        <User size={14} className="text-white/50" />
                      </div>
                      <span className="text-white/80 font-medium">
                        {post.authorName || "Anonymous"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-white font-semibold">
                      {post.title}
                    </td>
                    <td className="px-6 py-5 text-white/50">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => openModal(post._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all text-sm font-bold"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // ডাটা না থাকলে এই অংশটি দেখাবে
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-white/30"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText size={40} className="opacity-20" />
                      <p>No forum posts available right now.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ডিলিট কনফার্মেশন Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-3xl max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-full">
                <AlertTriangle size={24} />
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/30 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Delete Post?</h2>
            <p className="text-white/50 text-sm mb-6">
              Are you sure you want to remove this post? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
