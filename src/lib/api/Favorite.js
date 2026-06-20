"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getFavorites(email) {
  const res = await fetch(`${baseUrl}/api/my-favorites/${email}`, {
    cache: "no-store",
  });
  return await res.json();
}
