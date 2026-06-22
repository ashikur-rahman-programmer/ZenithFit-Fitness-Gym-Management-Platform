"use client";
import { motion } from "framer-motion";

export default function TransactionsTable({ initialTransactions }) {
  // তারিখ ফরম্যাট করার ফাংশন (22 Jun 2026)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-white/50 text-sm">
          Review platform-wide payment history.
        </p>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        {/* রেসপন্সিভনেস নিশ্চিত করতে overflow-x-auto */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-white/5 uppercase text-xs text-white/50 tracking-widest">
              <tr>
                <th className="px-6 py-5 whitespace-nowrap">Transaction ID</th>
                <th className="px-6 py-5 whitespace-nowrap">User Email</th>
                <th className="px-6 py-5 whitespace-nowrap">Amount</th>
                <th className="px-6 py-5 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {initialTransactions.length > 0 ? (
                initialTransactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-5 font-mono text-xs text-blue-400/80 bg-blue-500/5 rounded-lg m-2">
                      {/* আইডি বড় হাতের ও দেখতে সুন্দর */}
                      {txn.paymentIntent
                        ? txn.paymentIntent.toUpperCase()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-5 text-white/70 text-sm">
                      {txn.email}
                    </td>
                    <td className="px-6 py-5 font-bold text-white">
                      ${txn.amount ? txn.amount.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-6 py-5 text-white/50 text-sm whitespace-nowrap">
                      {formatDate(txn.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-white/30"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
