import ManageForumTable from "@/components/dashboard/admin/ManageForumTable";

async function getForumPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ManageForumPage() {
  const posts = await getForumPosts();

  return (
    <div className="p-6">
      <ManageForumTable initialPosts={posts} />
    </div>
  );
}
