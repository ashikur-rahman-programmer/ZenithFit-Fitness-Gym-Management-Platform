"use client";

import { ShieldCheck, Zap, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Ultra-Premium UI",
      desc: "Pixel-perfect interfaces crafted with precision, focusing on aesthetic brilliance and high-end responsiveness.",
      icon: <Zap className="text-red-500" size={24} />,
    },
    {
      title: "High Performance",
      desc: "Optimized with SSR, caching, and lazy loading to ensure seamless interaction even with heavy data loads.",
      icon: <Award className="text-red-500" size={24} />,
    },
    {
      title: "Secure Auth & Data",
      desc: "Enterprise-grade authentication and robust database integration to protect user identity and privacy.",
      icon: <ShieldCheck className="text-red-500" size={24} />,
    },
    {
      title: "Community Focused",
      desc: "Built to foster interaction, featuring real-time updates, engagement metrics, and community management.",
      icon: <Users className="text-red-500" size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            The Value We Deliver
          </span>
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Why Choose Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Platform
            </span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg">
            ZenithFit turns complex gym management into a seamless digital
            experience. Robust, scalable, and built to grow your fitness
            business efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-red-600/30 transition-colors duration-500 group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-red-600/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
