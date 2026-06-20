"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@heroui/react";

export default function ClassFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // এটি যুক্ত করা হলো

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // ফিল্টার চেঞ্জ করলে পেজ ১ এ চলে যাবে
    params.set("page", "1");

    // pathname যুক্ত করে ঠিকভাবে URL পুশ করা হলো
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        placeholder="Search by class name..."
        defaultValue={currentSearch}
        onChange={(e) => updateURL("search", e.target.value)}
        startContent={<Search size={18} className="text-white/50" />}
        className="flex-1"
      />
      <select
        value={currentCategory}
        onChange={(e) => updateURL("category", e.target.value)}
        className="bg-[#111111] p-3 rounded-xl border border-white/10 outline-none focus:border-red-500 transition-all text-white"
      >
        <option value="all">All Categories</option>
        <option value="Yoga">Yoga</option>
        <option value="Cardio">Cardio</option>
        <option value="Weights">Weights</option>
        <option value="HIIT">HIIT</option>
        <option value="Strength">Strength</option>
      </select>
    </div>
  );
}
