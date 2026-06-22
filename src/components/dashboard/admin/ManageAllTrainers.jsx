"use client";
import { useState } from "react";
import { UserMinus, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { updateTrainerRole } from "@/lib/api/Trainer";

export default function ManageAllTrainers({ initialTrainers }) {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [loadingId, setLoadingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDemote = async () => {
    if (!selectedTrainer) return;

    setLoadingId(selectedTrainer._id);
    try {
      const res = await updateTrainerRole(selectedTrainer.email, "User");
      if (res.success) {
        setTrainers((prev) =>
          prev.filter((t) => t._id !== selectedTrainer._id),
        );
        toast.success("Demoted successfully!");
      }
    } catch (err) {
      toast.error("Update failed!");
    } finally {
      setLoadingId(null);
      setIsModalOpen(false);
      setSelectedTrainer(null);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <h1 className="text-2xl font-bold">Manage Trainers</h1>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px] border-collapse">
            <thead className="text-xs uppercase text-white/50 border-b border-white/5">
              <tr className="border-b border-white/5">
                <th className="p-4 md:p-6">Name</th>
                <th className="p-4 md:p-6">Email</th>
                <th className="p-4 md:p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trainers && trainers.length > 0 ? (
                trainers.map((t) => (
                  <tr key={t._id} className="hover:bg-white/[0.02]">
                    <td className="p-4 md:p-6 text-sm">{t.name}</td>
                    <td className="p-4 md:p-6 text-sm text-white/70">
                      {t.email}
                    </td>
                    <td className="p-4 md:p-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedTrainer(t);
                          setIsModalOpen(true);
                        }}
                        className="bg-red-500/10 text-red-400 px-3 py-2 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-2 ml-auto"
                      >
                        <UserMinus size={14} /> Demote
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-10 text-center text-white/50 italic"
                  >
                    No active trainers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* মোডাল কোড আগের মতোই থাকবে */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Confirm Action</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-white/60 mb-6">
              Are you sure you want to demote{" "}
              <strong>{selectedTrainer?.name}</strong> to a standard user?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDemote}
                disabled={loadingId === selectedTrainer?._id}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-bold flex justify-center items-center"
              >
                {loadingId === selectedTrainer?._id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
