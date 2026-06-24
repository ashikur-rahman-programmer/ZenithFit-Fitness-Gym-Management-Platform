"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="py-24 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Info with Motion */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-white/50 mb-10 text-lg leading-relaxed">
              Have questions about ZenithFit or ready to scale your fitness
              business? Our team is here to assist you 24/7.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: "Dhaka, Bangladesh" },
                { icon: Phone, text: "+880 1234-567890" },
                { icon: Mail, text: "support@zenithfit.com" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white/70">
                  <div className="p-3 bg-red-600/10 rounded-full text-red-500">
                    <item.icon size={20} />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form with Motion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#111111] p-8 rounded-3xl border border-white/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ashikur Rahman"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">
                  Message
                </label>
                <textarea
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                ></textarea>
              </div>

              <button className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all active:scale-[0.98]">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
