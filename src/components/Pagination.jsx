"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get("page") || "1");
  // যদি totalPages 0 হয় (মানে কোনো ডাটা নেই), তাহলে ডিফল্ট 1 ধরব
  const safeTotalPages = totalPages > 0 ? totalPages : 1;

  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center items-center gap-4 pt-10">
      <button
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}
        className="px-6 py-2 bg-[#111111] border border-white/10 text-white rounded-xl hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>

      <span className="text-white/70 font-medium">
        Page {currentPage} of {safeTotalPages}
      </span>

      <button
        disabled={currentPage >= safeTotalPages}
        onClick={() => updatePage(currentPage + 1)}
        className="px-6 py-2 bg-[#111111] border border-white/10 text-white rounded-xl hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
}
