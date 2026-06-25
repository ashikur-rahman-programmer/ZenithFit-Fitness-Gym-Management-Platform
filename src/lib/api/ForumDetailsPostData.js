"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export async function getPostData(id) {
  const { token } = await auth.api.getToken({ headers: await headers() });

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/forum/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}
