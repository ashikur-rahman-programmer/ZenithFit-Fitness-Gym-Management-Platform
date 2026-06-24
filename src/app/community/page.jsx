import ForumClientCommunication from "@/components/ForumClientCommunication";
import { getForumPosts } from "@/lib/api/Forum";

export default async function ForumPage() {
  const posts = await getForumPosts();

  return <ForumClientCommunication initialPosts={posts} />;
}
