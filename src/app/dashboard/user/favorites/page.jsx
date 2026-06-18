"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, Clock, User } from "lucide-react";
import { useState } from "react";

export default function FavoritesPage() {
  // ডামি ডাটা - পরবর্তীতে ডাটাবেস থেকে আনবেন
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Advanced Yoga", trainer: "John Doe", duration: "60 mins" },
    {
      id: 2,
      name: "Strength Training",
      trainer: "Sarah Smith",
      duration: "45 mins",
    },
    { id: 3, name: "Cardio Blast", trainer: "Mike Ross", duration: "30 mins" },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Favorite Classes</h1>
        <p className="text-white/50 text-sm">Your saved fitness sessions</p>
      </div>

      {/* Grid Layout: মোবাইলে ১টি, ট্যাবলেটে ২টি, ডেস্কটপে ৩টি কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {favorites.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-red-500/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-red-600/10 text-red-500">
                  <Heart size={20} fill="currentColor" />
                </div>
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/5 hover:border-red-500/30 transition-all text-white/50 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-white mb-4">{item.name}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <User size={14} /> <span>{item.trainer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Clock size={14} /> <span>{item.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <Heart size={40} className="mx-auto text-white/20 mb-4" />
          <h3 className="text-white font-medium">No favorites yet</h3>
          <p className="text-white/40 text-sm">
            Explore classes and save your favorites.
          </p>
        </div>
      )}
    </motion.div>
  );
}
