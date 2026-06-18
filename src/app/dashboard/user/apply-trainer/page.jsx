"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Award, FileText, CheckCircle2 } from "lucide-react";

export default function ApplyAsTrainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // এখানে API কল হবে
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[60vh] text-center"
      >
        <CheckCircle2 size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-bold">Application Submitted!</h2>
        <p className="text-white/60 mt-2">
          Your application is now under review. We will notify you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold">Apply as Trainer</h1>
        <p className="text-white/50 text-sm">
          Join our elite team of fitness professionals.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-6"
      >
        {/* Experience Field */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Years of Experience
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-3 text-white/30" size={18} />
            <input
              type="number"
              required
              min="1"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500 transition-all"
              placeholder="e.g. 3"
            />
          </div>
        </div>

        {/* Specialty Field */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Specialty
          </label>
          <div className="relative">
            <Briefcase
              className="absolute left-3 top-3 text-white/30"
              size={18}
            />
            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500 transition-all appearance-none">
              <option>Yoga</option>
              <option>Weights & Powerlifting</option>
              <option>Cardio & HIIT</option>
              <option>Zumba & Dance</option>
            </select>
          </div>
        </div>

        {/* Motivation Field */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Why do you want to be a trainer?
          </label>
          <div className="relative">
            <FileText
              className="absolute left-3 top-3 text-white/30"
              size={18}
            />
            <textarea
              required
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500 transition-all"
              placeholder="Share your passion for fitness..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </motion.div>
  );
}
