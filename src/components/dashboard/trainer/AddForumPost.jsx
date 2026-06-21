"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Loader2,
  FileText,
  Upload,
  MessageSquareText,
} from "lucide-react";
import { imageUpload } from "@/lib/ImageUpload";
import { addForumPost } from "@/lib/api/Forum";
import { toast } from "react-toastify";

export default function AddForumPost({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const imageFile = formData.get("image");

    try {
      // ইমেজ আপলোড
      const imageRes = await imageUpload(imageFile);
      console.log(imageRes);
      if (!imageRes?.display_url) throw new Error("Image upload failed");

      const postData = {
        title: formData.get("title"),
        description: formData.get("description"),
        image: imageRes.display_url,

        authorName: user?.name,
        authorEmail: user?.email,
        status: "Approved",
        createdAt: new Date(),
      };

      await addForumPost(postData);

      toast.success("Forum post submitted for review!");
      e.target.reset();
    } catch (err) {
      toast.error("Failed to publish post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              name="title"
              required
              type="text"
              className={inputClass}
              placeholder="Enter an engaging title..."
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
              name="image"
              required
              type="file"
              accept="image/*"
              className={`${inputClass} file:bg-red-600 file:border-none file:text-white file:rounded-lg file:py-1 file:px-2 cursor-pointer`}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className={iconClass} size={18} />
            <textarea
              name="description"
              required
              rows="6"
              className={inputClass}
              placeholder="Write your post content here..."
            />
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Publishing...
            </>
          ) : (
            <>
              Publish Post <Send size={18} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
