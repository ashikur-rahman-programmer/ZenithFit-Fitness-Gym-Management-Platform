"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageSquareText,
  Image as ImageIcon,
  FileText,
  Upload,
  Send,
} from "lucide-react";

export default function AddForumPost() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        { method: "POST", body: formDataImg },
      );
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posting to Forum:", formData);
    // API call এখানে হবে
  };

  const inputClass =
    "w-full bg-[#111111] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-red-500 transition-all text-white placeholder:text-white/20";
  const iconClass = "absolute left-3 top-3.5 text-white/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Add Forum Post</h1>
        <p className="text-white/50 text-sm">
          Share your knowledge with the fitness community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Post Title
          </label>
          <div className="relative">
            <MessageSquareText className={iconClass} size={18} />
            <input
              required
              type="text"
              className={inputClass}
              placeholder="Enter an engaging title..."
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Upload Image
          </label>
          <div className="relative">
            <Upload className={iconClass} size={18} />
            <input
              type="file"
              onChange={handleImageUpload}
              className={`${inputClass} file:bg-red-600 file:border-none file:text-white file:rounded-lg file:py-1 file:px-2`}
            />
          </div>
          {uploading && (
            <p className="text-red-500 text-xs mt-2">Uploading to ImgBB...</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className={iconClass} size={18} />
            <textarea
              required
              rows="6"
              className={inputClass}
              placeholder="Write your post content here..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Publish Post <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
}
