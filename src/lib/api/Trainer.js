"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getTrainers(formData) {
  const res = await fetch(`${baseUrl}/api/trainer-application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to submit");
  return await res.json();
}
