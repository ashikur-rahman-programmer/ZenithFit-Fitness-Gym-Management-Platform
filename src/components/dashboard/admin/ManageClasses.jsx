"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { updateClassStatus, deleteClass } from "@/lib/action/classActions";

export default function ManageClasses({ initialClasses }) {
  const [classes, setClasses] = useState(initialClasses);

  const handleAction = async (id, action, status = null) => {
    try {
      if (action === "delete") {
        await deleteClass(id);
        setClasses(classes.filter((c) => c._id !== id));
        toast.success("Class deleted successfully!");
      } else {
        await updateClassStatus(id, status);
        setClasses(classes.map((c) => (c._id === id ? { ...c, status } : c)));
        toast.success(`Class marked as ${status}!`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-0"
    >
      <h1 className="text-2xl font-bold">Manage Classes</h1>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Class</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {classes.map((cls) => (
                <tr
                  key={cls._id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-5 font-medium whitespace-nowrap">
                    {cls.name}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        cls.status === "Approved"
                          ? "text-green-500"
                          : cls.status === "Rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  {/* বাটনগুলো এখন আর কোনো কন্ডিশনের ওপর নির্ভর করছে না */}
                  <td className="px-6 py-5 flex justify-end gap-2">
                    <button
                      onClick={() =>
                        handleAction(cls._id, "update", "Approved")
                      }
                      className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 text-xs font-bold transition-all"
                    >
                      <CheckCircle size={16} />
                      <span className="hidden md:inline">Approve</span>
                    </button>
                    <button
                      onClick={() =>
                        handleAction(cls._id, "update", "Rejected")
                      }
                      className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500/20 text-xs font-bold transition-all"
                    >
                      <XCircle size={16} />
                      <span className="hidden md:inline">Reject</span>
                    </button>
                    <button
                      onClick={() => handleAction(cls._id, "delete")}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 text-xs font-bold transition-all"
                    >
                      <Trash2 size={16} />
                      <span className="hidden md:inline">Delete</span>
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
