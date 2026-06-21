"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ViewAttendeesModal from "./ViewAttendeesModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UpdateClassModal from "./UpdateClassModal";
import { Edit2, Trash2, Users } from "lucide-react";

export default function MyClassesClient({ initialClasses, stats }) {
  const [classes] = useState(initialClasses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAttendeesOpen, setIsAttendeesOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">My Classes</h1>

      {/* স্ট্যাটাস সামারি কার্ড */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-500">
          <p className="text-sm">Pending Classes</p>
          <h2 className="text-2xl font-bold">{stats.pending || 0}</h2>
        </div>
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500">
          <p className="text-sm">Approved Classes</p>
          <h2 className="text-2xl font-bold">{stats.approved || 0}</h2>
        </div>
      </div>

      {/* কন্ডিশনাল টেবিল রেন্ডারিং */}
      {classes.length > 0 ? (
        <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Class</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-5 font-medium">{cls.name}</td>
                  <td className="px-6 py-5 text-white/70">{cls.category}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${cls.status === "Approved" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedClass(cls);
                        setIsEditOpen(true);
                      }}
                      className="p-2 bg-white/5 rounded-xl hover:bg-blue-500/20"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClass(cls);
                        setIsDeleteOpen(true);
                      }}
                      className="p-2 bg-white/5 rounded-xl hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClass(cls);
                        setIsAttendeesOpen(true);
                      }}
                      className="p-2 bg-white/5 rounded-xl hover:bg-purple-500/20 flex items-center gap-1"
                    >
                      <Users size={16} />
                      <span className="text-xs">
                        {cls.attendees ? cls.attendees.length : 0}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl border border-dashed border-white/10 text-white/50">
          <p>You have not created any classes yet.</p>
        </div>
      )}

      {/* মোডালসমূহ */}
      <UpdateClassModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classData={selectedClass}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
      />
      <ViewAttendeesModal
        isOpen={isAttendeesOpen}
        onClose={() => setIsAttendeesOpen(false)}
        attendees={selectedClass?.attendees || []}
      />
    </motion.div>
  );
}
