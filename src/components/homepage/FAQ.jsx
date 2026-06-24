"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How does ZenithFit manage gym memberships?",
    answer:
      "ZenithFit provides an automated dashboard where you can track member status, renewals, and payments in real-time, reducing manual administrative work.",
  },
  {
    question: "Is there a real-time class scheduling system?",
    answer:
      "Yes, our platform includes a robust booking system where members can view schedules, book slots, and receive notifications instantly.",
  },
  {
    question: "Can I track my members' progress and analytics?",
    answer:
      "Absolutely! ZenithFit features advanced analytics tools that allow trainers to log workouts, track body metrics, and visualize member progress over time.",
  },
  {
    question: "Is my gym data secure on the platform?",
    answer:
      "We prioritize security by using enterprise-grade authentication and encrypted databases, ensuring all member information and payment data remain completely private.",
  },
  {
    question: "Can ZenithFit scale for large gym chains?",
    answer:
      "Yes, our architecture is built with scalability in mind, making it equally effective for personal training studios and large fitness franchises.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0); // প্রথমটি ডিফল্ট খোলা থাকবে

  return (
    <section className="py-24 ">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Support Center
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50">
            Everything you need to know about ZenithFit.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-red-600/30 transition-colors"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-white">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-red-500"
                >
                  {activeIndex === index ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-white/60 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
