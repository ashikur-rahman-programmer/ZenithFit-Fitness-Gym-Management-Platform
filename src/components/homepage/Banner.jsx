"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Dumbbell, Users } from "lucide-react";

export default function Banner() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* 1. Banner Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('/gym-bg.jpg')] bg-cover bg-center opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase italic">
            Push Your <span className="text-red-600">Limits</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Transform your life with expert trainers, high-intensity classes,
            and a community that never quits.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 bg-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-700 transition"
          >
            Explore Classes <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* 2. Featured Classes Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Featured Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#111111] p-6 rounded-3xl border border-white/10 hover:border-red-600 transition"
            >
              <div className="h-40 bg-white/5 rounded-2xl mb-4" />
              <h3 className="text-xl font-bold">Power Yoga</h3>
              <p className="text-white/50 text-sm">Trainer: John Doe</p>
              <div className="mt-4 flex justify-between items-center text-sm font-bold text-red-500">
                <span>$49/mo</span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> 120 Bookings
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Latest Forum Posts Section */}
      <section className="py-20 bg-[#0d0d0d] px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Latest Forum Discussions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-l-2 border-red-600 pl-4 space-y-2">
                <h4 className="font-bold">How to maximize muscle recovery?</h4>
                <p className="text-xs text-white/40">
                  By Trainer X • 2 hours ago
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Extra Static Section 1: Why Choose Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Dumbbell className="mx-auto text-red-600" size={40} />
            <h3 className="text-xl font-bold">Modern Equipment</h3>
            <p className="text-white/50">
              High-end fitness tools for your best performance.
            </p>
          </div>
          {/* Repeat for other points */}
        </div>
      </section>

      {/* 5. Extra Static Section 2: Newsletter/CTA */}
      <section className="py-20 bg-red-600 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
        <button className="bg-black px-10 py-4 rounded-xl font-bold">
          Join Membership Now
        </button>
      </section>
    </div>
  );
}
