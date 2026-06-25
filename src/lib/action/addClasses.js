"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addClasses = async (classData) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await fetch(`${baseUrl}/api/classes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classData),
  });
  const data = await res.json();
  return data;
};
