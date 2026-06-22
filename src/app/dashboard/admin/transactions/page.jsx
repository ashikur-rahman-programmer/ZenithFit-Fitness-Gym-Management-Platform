import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";

async function getPayments() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transaction`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function TransactionsPage() {
  const transactions = await getPayments();
  return <TransactionsTable initialTransactions={transactions} />;
}

// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { CreditCard } from "lucide-react";

// export default function Transactions() {
//   // ডামি ডাটা - আপনার Stripe API বা ব্যাকএন্ড ডাটাবেস থেকে আসবে
//   const [transactions] = useState([
//     {
//       id: "txn_1001",
//       email: "user1@example.com",
//       amount: "$50.00",
//       date: "June 18, 2026",
//     },
//     {
//       id: "txn_1002",
//       email: "user2@example.com",
//       amount: "$30.00",
//       date: "June 17, 2026",
//     },
//     {
//       id: "txn_1003",
//       email: "user3@example.com",
//       amount: "$45.00",
//       date: "June 16, 2026",
//     },
//   ]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="space-y-6"
//     >
//       <div>
//         <h1 className="text-2xl font-bold text-white">Transactions</h1>
//         <p className="text-white/50 text-sm">
//           Review platform-wide payment history.
//         </p>
//       </div>

//       <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[700px]">
//             <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
//               <tr>
//                 <th className="px-6 py-5">Transaction ID</th>
//                 <th className="px-6 py-5">User Email</th>
//                 <th className="px-6 py-5">Amount</th>
//                 <th className="px-6 py-5">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/5">
//               {transactions.map((txn) => (
//                 <tr key={txn.id} className="hover:bg-white/[0.02]">
//                   <td className="px-6 py-5 font-mono text-blue-400 text-sm">
//                     {txn.id}
//                   </td>
//                   <td className="px-6 py-5 text-white/70">{txn.email}</td>
//                   <td className="px-6 py-5 font-bold text-white">
//                     {txn.amount}
//                   </td>
//                   <td className="px-6 py-5 text-white/50 text-sm">
//                     {txn.date}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
