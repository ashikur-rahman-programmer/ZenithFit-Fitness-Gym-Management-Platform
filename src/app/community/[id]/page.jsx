import { notFound, redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import PostInteractions from "@/components/PostInteractions"; // ক্লায়েন্ট কম্পোনেন্ট

async function getPostData(id) {
  // ডাটাবেস কুয়েরি এখানে হবে
  return {
    id,
    title: "The Science Behind Muscle Recovery",
    description: "Full content here...",
    image: "/forum-1.jpg",
  };
}

export default async function ForumPostDetails({ params }) {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  if (!session) redirect("/login");

  const { id } = await params;
  const post = await getPostData(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#111111] p-8 rounded-3xl border border-white/10">
          <img
            src={post.image}
            className="w-full h-80 object-cover rounded-2xl mb-6"
            alt={post.title}
          />
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-white/70 text-lg">{post.description}</p>
        </div>

        {/* এখানে ক্লায়েন্ট লজিক পাস করা হচ্ছে */}
        <PostInteractions postId={id} />
      </div>
    </div>
  );
}
