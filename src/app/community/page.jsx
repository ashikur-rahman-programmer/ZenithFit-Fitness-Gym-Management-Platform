import ForumClientCommunication from "@/components/ForumClientCommunication";
import { getForumCommunityPosts } from "@/lib/api/Forum";

export default async function ForumPage({ searchParams }) {
  const page = (await searchParams)?.page || 1;
  const data = await getForumCommunityPosts(page);

  return (
    <ForumClientCommunication
      initialPosts={data.posts}
      totalPages={data.totalPages}
    />
  );
}
