"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

// ১. ক্লাসের ডাটা এবং ইউজারের স্ট্যাটাস একসাথে আনা
export const getClassDetailsWithStatus = async (classId, userEmail) => {
  try {
    // ক্লাস ডাটা আনা
    const classRes = await fetch(`${baseUrl}/api/classes/${classId}`, {
      cache: "no-store",
    });
    if (!classRes.ok) return null;
    const classData = await classRes.json();

    // ইউজার লগইন থাকলে তার স্ট্যাটাস আনা
    let statusData = { isBooked: false, isFavorited: false };
    if (userEmail) {
      const statusRes = await fetch(
        `${baseUrl}/api/user-class-status?email=${userEmail}&classId=${classId}`,
        { cache: "no-store" },
      );
      if (statusRes.ok) {
        statusData = await statusRes.json();
      }
    }

    return { classData, statusData };
  } catch (error) {
    console.error("Error fetching class details:", error);
    return null;
  }
};

// ২. ফেভারিট টগল করার অ্যাকশন (Form Action এর জন্য)
export const toggleFavoriteAction = async (userEmail, classId, classData) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  if (!userEmail) return { error: "Please login first" };

  try {
    const res = await fetch(`${baseUrl}/api/favorites/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: userEmail, classId, classData }),
    });

    const result = await res.json();

    // ডাটা আপডেট হওয়ার পর পেজ রিভ্যালিডেট করা যাতে ফ্রেশ ডাটা দেখায়
    revalidatePath(`/classes/${classId}`);

    return result; // { status: "added" | "removed", message: ... }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
