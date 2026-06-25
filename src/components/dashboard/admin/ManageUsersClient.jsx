"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Ban, UserCheck, Loader2, ShieldX } from "lucide-react";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/api/UserManage";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdate = async (email, updateData, successMsg) => {
    setLoading(email);
    try {
      const res = await updateUser(email, updateData);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, ...updateData } : u)),
        );
        toast.success(successMsg);
      } else {
        toast.error(res.message || "Failed to update!");
      }
    } catch (err) {
      toast.error("Failed to update user!");
    } finally {
      setLoading(null);
    }
  };

  const openDemoteModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 md:p-0"
    >
      <h1 className="text-2xl font-bold text-white">Manage Users</h1>

      {/* Table Container - Mobile Responsive */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-5 font-medium">{user.name}</td>
                  <td className="px-6 py-5 text-white/70">{user.email}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${user.role === "admin" ? "bg-purple-500/10 text-purple-400" : "bg-white/5 text-white"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${user.status === "Blocked" ? "text-red-500" : "text-green-500"}`}
                    >
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right flex justify-end gap-2">
                    {user.role !== "admin" ? (
                      <button
                        disabled={loading === user.email}
                        onClick={() =>
                          handleUpdate(
                            user.email,
                            { role: "admin" },
                            "Promoted to Admin!",
                          )
                        }
                        className="flex items-center gap-1 px-2 py-2 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 text-[10px] md:text-xs font-bold transition-all"
                      >
                        {loading === user.email ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <ShieldCheck size={14} />
                        )}
                        <span className="hidden md:block">Make Admin</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => openDemoteModal(user)}
                        className="flex items-center gap-1 px-2 py-2 bg-yellow-500/10 text-yellow-400 rounded-xl hover:bg-yellow-500/20 text-[10px] md:text-xs font-bold transition-all"
                      >
                        <ShieldX size={14} />
                        <span className="hidden md:block">Demote</span>
                      </button>
                    )}

                    <button
                      disabled={loading === user.email || user.role === "admin"}
                      onClick={() =>
                        handleUpdate(
                          user.email,
                          {
                            status:
                              user.status === "Blocked" ? "Active" : "Blocked",
                          },
                          user.status === "Blocked"
                            ? "User Unblocked!"
                            : "User Blocked!",
                        )
                      }
                      className={`flex items-center gap-1 px-2 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all ${user.role === "admin" ? "opacity-30 cursor-not-allowed bg-gray-800" : user.status === "Blocked" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
                    >
                      {loading === user.email ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : user.status === "Blocked" ? (
                        <UserCheck size={14} />
                      ) : (
                        <Ban size={14} />
                      )}
                      <span className="hidden md:block">
                        {user.status === "Blocked" ? "Unblock" : "Block"}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 w-full max-w-xs shadow-2xl">
            <h2 className="text-white font-bold mb-4">
              Demote {selectedUser?.name}
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  handleUpdate(
                    selectedUser.email,
                    { role: "user" },
                    "Demoted to User!",
                  );
                  setIsModalOpen(false);
                }}
                className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10"
              >
                To User
              </button>
              <button
                onClick={() => {
                  handleUpdate(
                    selectedUser.email,
                    { role: "trainer" },
                    "Demoted to Trainer!",
                  );
                  setIsModalOpen(false);
                }}
                className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10"
              >
                To Trainer
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
