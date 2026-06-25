"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function addForumPost(postData) {
  const { token } = await auth.api.getToken({ headers: await headers() });
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  const res = await fetch(`${baseUrl}/api/forum`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await res.json();
}

export async function getForumPosts() {
  try {
    const res = await fetch(`${baseUrl}/api/forum`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getForumCommunityPosts(page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/all-forums?page=${page}&limit=6`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
