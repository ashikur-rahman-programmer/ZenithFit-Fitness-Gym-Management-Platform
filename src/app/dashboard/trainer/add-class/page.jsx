"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookPlus,
  Tag,
  BarChart3,
  Clock,
  CalendarDays,
  DollarSign,
  FileText,
  Upload,
} from "lucide-react";
import { imageUpload } from "@/components/ImageUpload";
import { addClasses } from "@/lib/action/addClasses";

export default function AddClass() {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // ইমেজ আপলোড
    const imageFile = formData.get("image");
    const image = await imageUpload(imageFile);

    const allData = {
      ...data,
      image: image.url,
      status: "Pending",
    };

    const result = await addClasses(allData);
    console.log(result);
    setUploading(false);
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
        {/* Name: name="name" যোগ করা হয়েছে */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Class Name
          </label>
          <div className="relative">
            <BookPlus className={iconClass} size={18} />
            <input
              name="name"
              required
              type="text"
              className={inputClass}
              placeholder="e.g. Power Yoga"
            />
          </div>
        </div>

        {/* Image: name="image" যোগ করা হয়েছে */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Upload Image
          </label>
          <div className="relative">
            <Upload className={iconClass} size={18} />
            <input
              name="image"
              required
              type="file"
              className={`${inputClass} file:bg-red-600 file:border-none file:text-white file:rounded-lg file:py-1 file:px-2`}
            />
          </div>
        </div>

        {/* Category: name="category" যোগ করা হয়েছে */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Category
          </label>
          <div className="relative">
            <Tag className={iconClass} size={18} />
            <select name="category" className={selectClass}>
              <option value="Yoga">Yoga</option>
              <option value="Weights">Weights</option>
              <option value="Cardio">Cardio</option>
            </select>
          </div>
        </div>

        {/* Difficulty: name="difficulty" যোগ করা হয়েছে */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Difficulty
          </label>
          <div className="relative">
            <BarChart3 className={iconClass} size={18} />
            <select name="difficulty" className={selectClass}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Duration: name="duration" যোগ করা হয়েছে */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Duration (mins)
          </label>
          <div className="relative">
            <Clock className={iconClass} size={18} />
            <input
              name="duration"
              required
              type="number"
              className={inputClass}
              placeholder="60"
            />
          </div>
        </div>

        {/* Price: name="price" যোগ করা হয়েছে */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Price ($)
          </label>
          <div className="relative">
            <DollarSign className={iconClass} size={18} />
            <input
              name="price"
              required
              type="number"
              className={inputClass}
              placeholder="20"
            />
          </div>
        </div>

        {/* Schedule: name="schedule" যোগ করা হয়েছে */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Schedule
          </label>
          <div className="relative">
            <CalendarDays className={iconClass} size={18} />
            <input
              name="schedule"
              required
              type="text"
              className={inputClass}
              placeholder="e.g. Mon, Wed - 10:00 AM"
            />
          </div>
        </div>

        {/* Description: name="description" যোগ করা হয়েছে */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className={iconClass} size={18} />
            <textarea
              name="description"
              required
              rows="3"
              className={inputClass}
              placeholder="Description..."
            />
          </div>
        </div>

        <button
          disabled={uploading}
          type="submit"
          className="md:col-span-2 bg-white text-black font-bold py-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          {uploading ? "Creating..." : "Create Class"}
        </button>
      </form>
    </motion.div>
  );
}
