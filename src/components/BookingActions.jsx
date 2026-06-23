// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";

// export default function BookingActions({
//   classId,
//   initialBooked,
//   initialFavorite,
// }) {
//   const router = useRouter();
//   const [isBooked, setIsBooked] = useState(initialBooked);
//   const [isFavorite, setIsFavorite] = useState(initialFavorite);
//   const [loading, setLoading] = useState(false);

//   // 1. বুকিং হ্যান্ডলার
//   const handleBooking = () => {
//     if (isBooked) {
//       toast.error("You have already booked this class!");
//       return;
//     }
//     // পেমেন্ট পেজে রিডাইরেক্ট (Stripe Checkout শুরু হবে সেখানে)
//     router.push(`/payment/${classId}`);
//   };

//   // 2. ফেভারিট হ্যান্ডলার
//   const toggleFavorite = async () => {
//     setLoading(true);
//     // TODO: BACKEND - এখানে POST /api/favorites অথবা DELETE কল করবেন

//     const newState = !isFavorite;
//     setIsFavorite(newState);

//     toast.success(
//       newState
//         ? "Successfully added to your favorites!"
//         : "Removed from favorites",
//     );
//     setLoading(false);
//   };

//   return (
//     <div className="flex gap-4">
//       {/* Book Now Button */}
//       <button
//         onClick={handleBooking}
//         className={`px-8 py-3 rounded-xl font-bold transition-all ${
//           isBooked
//             ? "bg-gray-700 cursor-not-allowed text-white/50"
//             : "bg-red-600 hover:bg-red-700"
//         }`}
//       >
//         {isBooked ? "Already Booked" : "Book Now"}
//       </button>

//       {/* Favorites Button */}
//       <button
//         onClick={toggleFavorite}
//         disabled={loading}
//         className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all"
//       >
//         {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
//       </button>
//     </div>
//   );
// }
