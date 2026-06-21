"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { updateTrainerStatus } from "@/lib/api/TrainerManage"; // আপনার পাথ অনুযায়ী ঠিক করে নিন

export default function ManageTrainers({ initialApplications }) {
  const [applications, setApplications] = useState(initialApplications || []);
  const [loading, setLoading] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAction = async (status) => {
    if (!selectedApp) return;

    setLoading(selectedApp._id);
    try {
      const res = await updateTrainerStatus(selectedApp._id, {
        status,
        feedback,
        email: selectedApp.email,
      });

      if (res.success) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== selectedApp._id),
        );
        toast.success(`Application ${status} successfully!`);
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsModalOpen(false);
      setFeedback("");
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-0"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Trainer Applications</h1>
        <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-white/50 border border-white/10">
          Total: {applications.length}
        </span>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Specialty</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-5 font-medium">{app.name}</td>
                    <td className="px-6 py-5 text-white/70">{app.email}</td>
                    <td className="px-6 py-5">{app.specialty}</td>
                    <td className="px-6 py-5 text-yellow-500 text-xs font-bold uppercase">
                      {app.status}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-xs hover:bg-blue-500/20 hover:text-blue-400 transition-all ml-auto"
                      >
                        <Eye size={16} /> Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-white/30"
                  >
                    No pending applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold mb-5 text-white">
              Review Application
            </h2>

            <div className="space-y-3 mb-6 text-sm text-white/70 bg-white/5 p-4 rounded-xl">
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>
              <p>
                <strong>Experience:</strong> {selectedApp.experience} years
              </p>
              <p>
                <strong>Specialty:</strong> {selectedApp.specialty}
              </p>
              <p>
                <strong>Available Time:</strong>{" "}
                {selectedApp.time || "Not specified"}
              </p>
            </div>

            <textarea
              placeholder="Provide feedback (optional)..."
              className="w-full bg-[#111111] p-4 rounded-xl mb-4 border border-white/10 outline-none focus:border-white/30 text-sm text-white placeholder:text-white/20"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                disabled={loading === selectedApp._id}
                onClick={() => handleAction("Approved")}
                className="flex-1 flex justify-center items-center gap-2 py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-bold text-sm hover:bg-green-500/20 transition-all"
              >
                {loading === selectedApp._id ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <CheckCircle size={18} /> Approve
                  </>
                )}
              </button>
              <button
                disabled={loading === selectedApp._id}
                onClick={() => handleAction("Rejected")}
                className="flex-1 flex justify-center items-center gap-2 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-all"
              >
                {loading === selectedApp._id ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <XCircle size={18} /> Reject
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full text-white/40 text-xs hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
