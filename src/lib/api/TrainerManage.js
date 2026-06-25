"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const getPendingTrainers = async () => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-application`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return res.json();
};

export const updateTrainerStatus = async (id, data) => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-application/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );
  return await res.json();
};
