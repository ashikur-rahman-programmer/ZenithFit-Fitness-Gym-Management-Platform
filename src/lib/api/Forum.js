"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function addForumPost(postData) {
  const res = await fetch(`${baseUrl}/api/forum`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  return await res.json();
}

export async function getForumPosts() {
  try {
    const res = await fetch(`${baseUrl}/api/forum`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
