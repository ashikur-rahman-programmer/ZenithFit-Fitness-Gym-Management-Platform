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
