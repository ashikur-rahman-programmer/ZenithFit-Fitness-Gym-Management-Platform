"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Award, FileText, CheckCircle2 } from "lucide-react";
import { getTrainers } from "@/lib/api/Trainer";

export default function ApplyAsTrainer({ user }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // চেক করুন আগে অ্যাপ্লিকেশন আছে কি না
    const checkRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/check-trainer-status/${user.email}`,
    );
    const statusData = await checkRes.json();

    if (statusData.status === "Pending") {
      alert("You already have a pending application!");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      email: user.email,
      name: user.name,
      experience: e.target.experience.value,
      specialty: e.target.specialty.value,
      motivation: e.target.motivation.value,
    };

    await getTrainers(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <CheckCircle2 size={64} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-white">
          Application Submitted!
        </h2>
        <p className="text-white/60 mt-2">
          Status: Pending. We will notify you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Apply as Trainer</h1>
        <p className="text-white/50 text-sm">Join our elite team.</p>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Years of Experience
        </label>
        <div className="relative">
          <Award className="absolute left-3 top-3 text-white/30" size={18} />
          <input
            name="experience"
            type="number"
            required
            min="1"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500"
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-2">Specialty</label>
        <div className="relative">
          <Briefcase
            className="absolute left-3 top-3 text-white/30"
            size={18}
          />
          <select
            name="specialty"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500 appearance-none text-white"
          >
            <option className="bg-black" value="Yoga">
              Yoga
            </option>
            <option className="bg-black" value="Weights">
              Weights & Powerlifting
            </option>
            <option className="bg-black" value="Cardio">
              Cardio & HIIT
            </option>
            <option className="bg-black" value="Zumba">
              Zumba & Dance
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Why do you want to be a trainer?
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-white/30" size={18} />
          <textarea
            name="motivation"
            required
            rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-red-500"
            placeholder="Share your passion..."
          />
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className="w-full bg-red-600 py-3 rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
