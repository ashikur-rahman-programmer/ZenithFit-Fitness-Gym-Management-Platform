import MyPostsClient from "@/components/dashboard/trainer/MyPostsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getTrainerPosts(email) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum?email=${email}`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <p>Unauthorized</p>;

  const posts = await getTrainerPosts(session?.user?.email);
  return <MyPostsClient initialPosts={posts} />;
}
