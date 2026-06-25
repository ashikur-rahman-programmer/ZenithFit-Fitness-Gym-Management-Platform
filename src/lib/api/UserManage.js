"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllUsers() {
  const { token } = await auth.api.getToken({ headers: await headers() });
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  const res = await fetch(`${baseUrl}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return res.json();
}

export async function updateUser(email, data) {
  const { token } = await auth.api.getToken({ headers: await headers() });
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await fetch(`${baseUrl}/api/users/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
