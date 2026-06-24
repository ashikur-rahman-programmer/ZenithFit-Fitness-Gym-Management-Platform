import Link from "next/link";
import Image from "next/image";
import { getFeaturedClasses } from "@/lib/api/FeaturedClasses";
import { ArrowRight } from "lucide-react";

export default async function FeaturedClasses() {
  const classes = await getFeaturedClasses();

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="text-red-600 font-semibold tracking-wider uppercase text-sm mb-2">
            Top Sessions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured <span className="text-white/40">Classes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="group bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Overlay */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={cls.image || "/default-class.jpg"}
                  alt={cls.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {cls.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-white/50 text-sm font-medium">
                      By {cls.trainerName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-white/40 text-xs uppercase mb-1">
                      Price
                    </span>
                    <span className="text-white font-semibold">
                      ${cls.price}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-white/40 text-xs uppercase mb-1">
                      Duration
                    </span>
                    <span className="text-white font-semibold">
                      {cls.duration} min
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                  <span className="text-white/60 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {cls.bookingCount || 0} Bookings
                  </span>
                  <Link
                    href={`/all-classes/${cls._id}`}
                    className="text-white font-semibold bg-white/5 px-5 py-2.5 rounded-xl hover:bg-red-600 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/all-classes"
            className="px-8 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all flex items-center gap-2 hover:border-red-600"
          >
            See More Classes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
