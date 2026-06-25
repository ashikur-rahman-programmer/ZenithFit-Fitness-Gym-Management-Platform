import TrainerOverview from "@/components/dashboard/trainer/TrainerOverview";
import { getTrainerStats } from "@/lib/api/Trainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Trainer Dashboard",
  description: "Browse through our expert-led fitness sessions",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <p>Unauthorized</p>;

  const statsData = await getTrainerStats(session.user.email);

  return <TrainerOverview user={session.user} stats={statsData} />;
}

// "use client";

// import { motion } from "framer-motion";
// import { Users, BookOpenText, UserCircle, Target, Award } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";

// export default function TrainerOverview() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // ডামি ডাটা - পরবর্তীতে ডাটাবেস থেকে আসবে
//   const stats = [
//     {
//       title: "Total Classes Created",
//       value: "12",
//       icon: BookOpenText,
//       color: "blue",
//     },
//     {
//       title: "Total Students Enrolled",
//       value: "148",
//       icon: Users,
//       color: "green",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="space-y-8"
//     >
//       <div>
//         <h1 className="text-2xl font-bold text-white">Trainer Overview</h1>
//         <p className="text-white/50 text-sm">
//           Manage your training sessions and monitor your progress.
//         </p>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {stats.map((stat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent group"
//           >
//             <div className="relative p-6 rounded-[23px] bg-[#111111] flex justify-between items-center overflow-hidden">
//               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
//               <div>
//                 <p className="text-white/50 text-sm font-medium">
//                   {stat.title}
//                 </p>
//                 <h2 className="text-4xl font-bold mt-2 text-white">
//                   {stat.value}
//                 </h2>
//               </div>
//               <div
//                 className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${stat.color === "blue" ? "text-blue-400" : "text-green-400"}`}
//               >
//                 <stat.icon size={28} />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Profile Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="p-8 rounded-3xl bg-[#111111] border border-white/5 flex flex-col md:flex-row items-center gap-8"
//       >
//         <div className="w-24 h-24 rounded-full ring-2 ring-red-600/50 p-1 relative">
//           {user?.image ? (
//             <Image
//               src={user.image}
//               alt={user.name}
//               fill
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold">
//               {user?.name?.charAt(0) || "T"}
//             </div>
//           )}
//         </div>

//         <div className="text-center md:text-left">
//           <div className="flex items-center justify-center md:justify-start gap-3">
//             <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
//             <span className="flex items-center gap-1 px-3 py-1 bg-red-600/10 text-red-500 border border-red-600/20 rounded-full text-xs font-bold uppercase tracking-widest">
//               <Award size={14} /> Trainer
//             </span>
//           </div>
//           <p className="text-white/50 mt-1">{user?.email}</p>
//           <div className="mt-4 flex gap-4 justify-center md:justify-start">
//             <div className="flex items-center gap-2 text-sm text-white/70">
//               <Target size={16} className="text-white/40" /> Expert in Fitness
//               Architecture
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
