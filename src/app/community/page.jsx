import ForumClientCommunication from "@/components/ForumClientCommunication";
import { getForumPosts } from "@/lib/api/Forum";

export default async function ForumPage() {
  const posts = await getForumPosts();
  console.log(posts);

  return <ForumClientCommunication initialPosts={posts} />;
}

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { User, Calendar, ArrowRight } from "lucide-react";

// export default function ForumPage() {
//   // ডামি ডেটা (পরে ব্যাকএন্ড থেকে ফেচ করবেন)
//   const posts = [
//     {
//       id: 1,
//       title: "The Science Behind Muscle Recovery",
//       author: "John Trainer",
//       date: "June 18, 2026",
//       description:
//         "Muscle recovery is often overlooked. In this post, we explore how proper nutrition and sleep can significantly speed up your progress...",
//       image: "/placeholder-forum.jpg",
//     },
//     {
//       id: 2,
//       title: "Benefits of Morning Yoga",
//       author: "Admin Zenith",
//       date: "June 17, 2026",
//       description:
//         "Starting your day with yoga can change your entire outlook. Learn the basic poses that help increase flexibility and mental clarity...",
//       image: "/placeholder-yoga.jpg",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold">Community Forum</h1>
//           <p className="text-white/50 max-w-2xl mx-auto">
//             Stay updated with expert tips, fitness insights, and community
//             discussions from our trainers and admin.
//           </p>
//         </div>

//         {/* Forum Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {posts.map((post) => (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all group"
//             >
//               {/* Image */}
//               <div className="h-56 bg-white/5 relative overflow-hidden">
//                 <div className="w-full h-full bg-gradient-to-tr from-red-600/20 to-transparent opacity-50" />
//                 {/* Image Placeholder */}
//               </div>

//               {/* Content */}
//               <div className="p-6 space-y-4">
//                 <div className="flex items-center gap-4 text-xs text-white/40">
//                   <span className="flex items-center gap-1">
//                     <User size={14} /> {post.author}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Calendar size={14} /> {post.date}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold leading-tight">
//                   {post.title}
//                 </h3>
//                 <p className="text-white/50 text-sm line-clamp-3">
//                   {post.description}
//                 </p>

//                 <Link
//                   href={`/community/${post.id}`}
//                   className="inline-flex items-center gap-2 text-red-500 font-bold text-sm hover:gap-3 transition-all"
//                 >
//                   Read More <ArrowRight size={16} />
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
