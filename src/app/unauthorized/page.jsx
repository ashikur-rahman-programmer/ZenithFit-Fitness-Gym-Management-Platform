"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-red-600/10 rounded-full border border-red-600/20">
            <ShieldAlert size={64} className="text-red-500" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-extrabold text-white mb-4">403</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/50 max-w-sm mx-auto mb-10">
            You don't have the necessary permissions to view this page. If you
            believe this is a mistake, please contact support.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={18} />
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
