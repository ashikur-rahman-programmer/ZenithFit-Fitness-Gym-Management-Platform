"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteFavoriteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className=" flex gap-1.5 items-center p-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/5"
    >
      <Trash2 size={16} className="text-red-400" /> Delete
    </button>
  );
}
