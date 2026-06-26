import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getFavorites } from "@/lib/api/Favorite";
import DeleteFavoriteButton from "@/components/dashboard/user/DeleteFavoriteButton";
import { headers } from "next/headers";

export const metadata = {
  title: "Favorite Classes",
  description: "Browse through our expert-led fitness sessions",
};

export default async function FavoriteClasses() {
  const session = await auth.api.getSession({ headers: await headers() });
  const favorites = await getFavorites(session?.user?.email);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Favorite Classes</h1>
        <p className="text-white/40 mt-2">
          Manage your saved classes and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <div
              key={item._id}
              className="group relative p-[1px] rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
            >
              <div className="bg-[#111111] p-6 rounded-[calc(2rem-1px)] h-full flex flex-col justify-between overflow-hidden relative">
                {/* ব্যাকগ্রাউন্ড গ্লো */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {item.classData.name}
                  </h2>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/50 text-[10px] uppercase tracking-wider font-semibold border border-white/5">
                    {item.classData.category}
                  </span>
                </div>

                <div className="relative mt-6 flex gap-3">
                  <Link
                    href={`/all-classes/${item.classId}`}
                    className="flex-1"
                  >
                    <button className="w-full flex justify-center gap-2 items-center p-3 rounded-2xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-sm font-medium">
                      <Eye size={16} /> View Details
                    </button>
                  </Link>

                  <DeleteFavoriteButton id={item._id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center p-6 border border-white/10 rounded-3xl text-white/40 text-sm bg-[#111111]">
            No favorite classes found
          </div>
        )}
      </div>
    </div>
  );
}
