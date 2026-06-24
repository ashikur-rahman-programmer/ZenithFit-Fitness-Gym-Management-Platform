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

        <h2 className="text-4xl font-extrabold text-white mb-4 text-center">
          Latest Community Insights
        </h2>
        <p className="text-white/50 max-w-3xl mx-auto text-center text-lg mb-12">
          Explore the heartbeat of fitness. Join the conversation, share your
          progress, and get inspired by our global network of fitness
          enthusiasts.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="group bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-red-600/50 hover:-translate-y-2 duration-500 transition-all flex flex-col min-h-[450px]"
            >
              {/* Image Section: h-48 থেকে h-64 এ বাড়ানো হয়েছে */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image || "/placeholder-forum.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Area: প্যাডিং এবং উচ্চতা বাড়ানো হয়েছে */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-white mb-4 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-white/40 mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {post.description}
                </p>

                {/* Footer: বাটন সেকশন */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-6 text-white/30 text-xs">
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={16} /> {post.likes?.length || 0}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} /> {post.comments?.length || 0}
                    </div>
                  </div>
                  <Link
                    href={`/community/${post._id}`}
                    className="text-red-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    View <ArrowRight size={16} />
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
