import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, ArrowRight } from "lucide-react";
import { getForumPosts } from "@/lib/api/Forum";

// Server Component: ডাটা সরাসরি সার্ভার থেকে লোড হচ্ছে
export default async function LatestForumPage() {
  const posts = await getForumPosts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {/* টাইটেলের উপরে ছোট লেখা */}
        <div className="text-center mb-4">
          <span className="text-red-600 font-semibold tracking-widest uppercase text-xs">
            Join the conversation
          </span>
        </div>

        <h2 className="text-4xl font-extrabold text-white mb-12 text-center">
          Latest Community Insights
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-red-600/50 hover:-translate-y-2 duration-500  transition-all "
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image || "/placeholder-forum.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-3 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-white/40 mb-6 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-white/30 text-xs">
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp size={14} /> {post.likes?.length || 0}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={14} /> {post.comments?.length || 0}
                    </div>
                  </div>
                  <Link
                    href={`/community/${post._id}`}
                    className="text-red-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    View <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* কার্ডের নিচে See More বাটন */}
        <div className="flex justify-center mt-12">
          <Link
            href="/community"
            className="px-8 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all flex items-center gap-2 hover:border-red-600"
          >
            See More Posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
