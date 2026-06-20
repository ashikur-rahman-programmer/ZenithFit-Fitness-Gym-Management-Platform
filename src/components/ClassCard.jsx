import Image from "next/image";
import Link from "next/link";

export default function ClassCard({ cls }) {
  return (
    <div className="bg-[#111111] p-6 rounded-3xl border border-white/10 hover:border-red-600/50 transition-all flex flex-col h-full">
      {/* Image Placeholder বা আসল ইমেজ */}
      <div className="relative w-full h-48 mb-6 bg-white/5 rounded-2xl overflow-hidden">
        <Image
          src={cls.image || "https://via.placeholder.com/400x200"}
          alt={cls.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{cls.name}</h3>
        <p className="text-white/50 text-sm mb-4">
          <span> Category : </span>
          <span className="text-red-400">{cls.category}</span>
        </p>
        <p className="text-white/70 text-sm line-clamp-2 mb-6">
          {cls.description ||
            "Join this amazing class to improve your fitness and reach your goals."}
        </p>
      </div>

      <Link
        href={`/all-classes/${cls._id}`}
        className="block w-full py-3 text-center border border-white/10 hover:bg-red-600 hover:border-red-600 rounded-xl font-bold transition-all text-white mt-auto"
      >
        View Details
      </Link>
    </div>
  );
}
