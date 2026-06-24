"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-red-600/10 rounded-full">
            <Dumbbell size={64} className="text-red-600" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-9xl font-extrabold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-6">
            Oops! You lost your form.
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-10">
            The page you are looking for has moved or no longer exists. Let's
            get you back to the gym floor.
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
