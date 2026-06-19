"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Ban, UserCheck } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "Trainer",
      status: "Blocked",
    },
  ]);

  const handleMakeAdmin = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: "Admin" } : u)));
    toast.success("User promoted to Admin!");
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u,
      ),
    );
    toast.success("User status updated!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">Manage Users</h1>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
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
                <tr key={user.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-5 font-medium">{user.name}</td>
                  <td className="px-6 py-5 text-white/70">{user.email}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${user.role === "Admin" ? "bg-purple-500/10 text-purple-500" : "bg-white/5 text-white"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-y-2 lg:space-y-0 lg:space-x-3 flex flex-col lg:flex-row justify-end">
                    {/* Make Admin Button */}
                    {user.role !== "Admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl hover:bg-purple-500/20 text-purple-400 text-xs font-bold transition-all"
                      >
                        <ShieldCheck size={16} /> Make Admin
                      </button>
                    )}

                    {/* Block/Unblock Button */}
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${user.status === "Active" ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"}`}
                    >
                      {user.status === "Active" ? (
                        <>
                          <Ban size={16} /> Block
                        </>
                      ) : (
                        <>
                          <UserCheck size={16} /> Unblock
                        </>
                      )}
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
