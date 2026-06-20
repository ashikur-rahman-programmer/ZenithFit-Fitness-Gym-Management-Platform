"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getBookedClasses(email) {
  try {
    const res = await fetch(`${baseUrl}/api/my-bookings/${email}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
