import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import PostInteractions from "@/components/PostInteractions";
import Image from "next/image";
import { getPostData } from "@/lib/api/ForumDetailsPostData";
import { Calendar, CheckCircle, Mail } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function ForumPostDetails({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const post = await getPostData(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title & Status Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-green-500/20">
              <CheckCircle size={12} /> {post.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">{post.title}</h1>
        </div>

        {/* Author Metadata Section */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 bg-[#111111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold">
              {post.authorName.charAt(0)}
            </div>
            <span className="text-white font-medium">{post.authorName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} /> {post.authorEmail}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Post Image */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description Content */}
        <div className="bg-[#111111] p-8 rounded-3xl border border-white/10">
          <p className="text-white/70 text-lg leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Interaction Component */}
        <PostInteractions
          postId={id}
          initialData={post}
          userEmail={session?.user?.email}
        />
      </div>
    </div>
  );
}
