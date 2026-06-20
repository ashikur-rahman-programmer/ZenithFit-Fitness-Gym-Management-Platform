"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { toggleFavoriteAction } from "@/lib/action/classDetailsActions";

export default function ActionButtons({ classData, userEmail, initialStatus }) {
  const router = useRouter();

  // Server থেকে আসা প্রাথমিক স্ট্যাটাস দিয়ে স্টেট সেট করা
  const [isFavorited, setIsFavorited] = useState(initialStatus.isFavorited);
  const [loading, setLoading] = useState(false);

  const handleBookNow = () => {
    if (!userEmail) {
      toast.error("Please login to book a class!");
      return router.push("/login");
    }

    if (initialStatus.isBooked) {
      toast.error("You have already booked this class!");
      return;
    }

    // পেমেন্ট পেজে রিডাইরেক্ট
    router.push(`/payment/${classData._id}`);
  };

  const handleToggleFavorite = async () => {
    if (!userEmail) {
      toast.error("Please login to add favorites!");
      return router.push("/login");
    }

    setLoading(true);
    // Server Action কল করা হচ্ছে
    const result = await toggleFavoriteAction(userEmail, classData._id, {
      name: classData.name,
      image: classData.image,
      category: classData.category,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      // লোকাল স্টেট আপডেট করা যাতে সাথে সাথে UI চেঞ্জ হয়
      setIsFavorited(result.status === "added");
      if (result.status === "added") toast.success(result.message);
      else toast.info(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={initialStatus.isBooked}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          initialStatus.isBooked
            ? "bg-white/10 text-white/50 cursor-not-allowed border border-white/5"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {initialStatus.isBooked ? "Already Booked" : "Book Now"}
      </button>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold transition-all border flex items-center justify-center gap-2 ${
          isFavorited
            ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
            : "bg-transparent text-white border-white/20 hover:bg-white/5"
        }`}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
        )}
        {isFavorited ? "Saved to Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
