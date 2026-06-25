"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import { toggleFavoriteAction } from "@/lib/action/classDetailsActions";
import { authClient } from "@/lib/auth-client";

export default function ActionButtons({
  classData,
  userEmail,
  userStatus,
  initialStatus,
}) {
  const router = useRouter();

  // স্টেট ম্যানেজমেন্ট
  const [isFavorited, setIsFavorited] = useState(initialStatus.isFavorited);
  const [isBooked, setIsBooked] = useState(initialStatus.isBooked);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBookNow = async () => {
    if (!userEmail) {
      toast.error("Please login to book a class!");
      return router.push("/login");
    }

    if (userStatus === "Blocked") {
      toast.error("Action restricted by Admin");
      return;
    }

    if (isBooked) return;

    setBookingLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId: classData._id }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);

      if (url) {
        setIsBooked(true); // UI তে বাটন সাথে সাথে আপডেট হবে
        window.location.href = url;
      }
    } catch (err) {
      toast.error(err.message || "Payment initiation failed");
      setBookingLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!userEmail) {
      toast.error("Please login to add favorites!");
      return router.push("/auth/login");
    }

    setLoading(true);
    const result = await toggleFavoriteAction(userEmail, classData._id, {
      name: classData.name,
      image: classData.image,
      category: classData.category,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      setIsFavorited(!isFavorited); // টগল সিস্টেম
      toast.success(result.message);
      router.refresh(); // সার্ভার কম্পোনেন্ট রি-ফ্রেস করা
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleBookNow}
        disabled={isBooked || bookingLoading}
        className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
          isBooked
            ? "bg-white/10 text-white/50 cursor-not-allowed border border-white/5"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {bookingLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : isBooked ? (
          "Already Booked"
        ) : (
          <>
            <CreditCard size={18} /> Book Now
          </>
        )}
      </button>

      <button
        onClick={handleToggleFavorite}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold transition-all border flex items-center justify-center gap-2 ${
          isFavorited
            ? "bg-red-500/10 text-red-500 border-red-500/20"
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
