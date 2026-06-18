"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookPlus,
  ImageIcon,
  Tag,
  BarChart3,
  Clock,
  CalendarDays,
  DollarSign,
  FileText,
  Upload,
} from "lucide-react";

export default function AddClass() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "Yoga",
    difficulty: "Beginner",
    duration: "",
    schedule: "",
    price: "",
    description: "",
    status: "Pending", // রিকোয়ারমেন্ট অনুযায়ী ডিফল্ট স্ট্যাটাস
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
    console.log("Submitting Data:", formData);
    // এখানে আপনার API Call হবে (e.g., axios.post('/api/classes', formData))
  };

  const inputClass =
    "w-full bg-[#111111] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-red-500 transition-all text-white placeholder:text-white/20";
  const selectClass =
    "w-full bg-[#111111] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-red-500 transition-all text-white appearance-none cursor-pointer";
  const iconClass = "absolute left-3 top-3.5 text-white/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Add New Class</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl bg-[#111111] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Class Name
          </label>
          <div className="relative">
            <BookPlus className={iconClass} size={18} />
            <input
              required
              type="text"
              className={inputClass}
              placeholder="e.g. Power Yoga"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
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
            <p className="text-red-500 text-xs mt-2">Uploading...</p>
          )}
        </div>

        {/* Category & Difficulty */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Category
          </label>
          <div className="relative">
            <Tag className={iconClass} size={18} />
            <select
              className={selectClass}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option className="bg-[#111111]">Yoga</option>
              <option className="bg-[#111111]">Weights</option>
              <option className="bg-[#111111]">Cardio</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Difficulty
          </label>
          <div className="relative">
            <BarChart3 className={iconClass} size={18} />
            <select
              className={selectClass}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
            >
              <option className="bg-[#111111]">Beginner</option>
              <option className="bg-[#111111]">Intermediate</option>
              <option className="bg-[#111111]">Advanced</option>
            </select>
          </div>
        </div>

        {/* Duration & Price */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Duration (mins)
          </label>
          <div className="relative">
            <Clock className={iconClass} size={18} />
            <input
              required
              type="number"
              className={inputClass}
              placeholder="60"
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Price ($)
          </label>
          <div className="relative">
            <DollarSign className={iconClass} size={18} />
            <input
              required
              type="number"
              className={inputClass}
              placeholder="20"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Schedule
          </label>
          <div className="relative">
            <CalendarDays className={iconClass} size={18} />
            <input
              required
              type="text"
              className={inputClass}
              placeholder="e.g. Mon, Wed - 10:00 AM"
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className={iconClass} size={18} />
            <textarea
              required
              rows="3"
              className={inputClass}
              placeholder="Description..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-white text-black font-bold py-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          Create Class
        </button>
      </form>
    </motion.div>
  );
}
