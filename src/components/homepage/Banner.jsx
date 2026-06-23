"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[500px] lg:h-[850px] overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Scale Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 bg-cover bg-center lg:bg-right"
        style={{ backgroundImage: "url('/banner.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-20 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl space-y-6 pt-20 lg:pt-0"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Master Your <br />
            <motion.span
              initial={{ color: "#ffffff" }}
              animate={{ color: "#dc2626" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-red-600"
            >
              Fitness Journey
            </motion.span>
          </h1>

          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            Experience the ultimate gym management platform. Empowering
            trainers, optimizing classes, and transforming members—all in one
            place.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4"
          >
            <Link
              href="/all-classes"
              className="inline-block px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
            >
              Explore Classes
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
