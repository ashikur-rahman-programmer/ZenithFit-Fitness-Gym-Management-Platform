"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageClasses() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Power Yoga", trainer: "John Doe", status: "Pending" },
    { id: 2, name: "HIIT Blast", trainer: "Sarah Smith", status: "Approved" },
  ]);

  const updateStatus = (id, newStatus) => {
    setClasses(
      classes.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    );
    toast.success(`Class marked as ${newStatus}!`);
  };

  const deleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
    toast.success("Class deleted successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Manage Classes</h1>

      {/* রেসপন্সিভ টেবিল কন্টেইনার */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Class</th>
                <th className="px-6 py-5">Trainer</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-5 font-medium">{cls.name}</td>
                  <td className="px-6 py-5 text-white/70">{cls.trainer}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        cls.status === "Approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex justify-end gap-2">
                    {cls.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(cls.id, "Approved")}
                          className="flex items-center gap-2 p-2 lg:px-3 lg:py-2 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 text-xs font-bold transition-all"
                        >
                          <CheckCircle size={18} />
                          <span className="hidden lg:inline">Approve</span>
                        </button>
                        <button
                          onClick={() => updateStatus(cls.id, "Rejected")}
                          className="flex items-center gap-2 p-2 lg:px-3 lg:py-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500/20 text-xs font-bold transition-all"
                        >
                          <XCircle size={18} />
                          <span className="hidden lg:inline">Reject</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="flex items-center gap-2 p-2 lg:px-3 lg:py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 text-xs font-bold transition-all"
                    >
                      <Trash2 size={18} />
                      <span className="hidden lg:inline">Delete</span>
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
