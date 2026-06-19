"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageTrainers() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Trainer",
      email: "john@trainer.com",
      experience: 5,
      specialty: "Yoga",
      status: "Pending",
    },
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAction = (status) => {
    toast.success(`Application ${status}! Feedback saved.`);
    setIsModalOpen(false);
    setFeedback("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Trainer Applications</h1>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        {/* রেসপন্সিভ টেবিল কন্টেইনার */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-5">{app.name}</td>
                  <td className="px-6 py-5 text-white/70">{app.email}</td>
                  <td className="px-6 py-5 text-yellow-500 font-bold">
                    {app.status}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-xs hover:bg-blue-500/20 hover:text-blue-400 transition-all ml-auto"
                    >
                      <Eye size={16} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - মোডালটি এখন সব স্ক্রিনে সুন্দর দেখাবে */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111111] p-6 md:p-8 rounded-3xl w-full max-w-sm md:max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="space-y-2 mb-6 text-sm text-white/70">
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>
              <p>
                <strong>Experience:</strong> {selectedApp.experience} years
              </p>
              <p>
                <strong>Specialty:</strong> {selectedApp.specialty}
              </p>
            </div>

            <textarea
              placeholder="Write feedback here..."
              className="w-full bg-white/5 p-3 rounded-xl mb-4 border border-white/10 outline-none focus:border-white/30"
              rows="3"
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAction("Approved")}
                className="flex-1 flex justify-center items-center gap-2 py-3 bg-green-600 rounded-xl font-bold text-sm hover:bg-green-700 transition-all"
              >
                <CheckCircle size={18} /> Approve
              </button>
              <button
                onClick={() => handleAction("Rejected")}
                className="flex-1 flex justify-center items-center gap-2 py-3 bg-red-600 rounded-xl font-bold text-sm hover:bg-red-700 transition-all"
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full text-white/50 text-sm hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
