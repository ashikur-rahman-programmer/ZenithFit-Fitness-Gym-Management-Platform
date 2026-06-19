"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UserMinus } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([
    { id: 1, name: "John Doe", email: "john@trainer.com", specialty: "Yoga" },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@trainer.com",
      specialty: "HIIT",
    },
  ]);

  const handleDemote = (id) => {
    // সরাসরি টোস্টের মাধ্যমে সাকসেস মেসেজ দেখানো
    setTrainers(trainers.filter((t) => t.id !== id));

    toast.success("Trainer has been demoted to User!", {
      style: {
        background: "#111111",
        color: "#fff",
        border: "1px solid #333",
      },
      icon: "📉",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Manage Trainers</h1>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
            <tr>
              <th className="px-6 py-5">Name</th>
              <th className="px-6 py-5">Email</th>
              <th className="px-6 py-5">Specialty</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-5 font-medium">{trainer.name}</td>
                <td className="px-6 py-5 text-white/70">{trainer.email}</td>
                <td className="px-6 py-5 text-white/70">{trainer.specialty}</td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handleDemote(trainer.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all ml-auto"
                  >
                    <UserMinus size={16} />
                    <span>Demote to User</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
