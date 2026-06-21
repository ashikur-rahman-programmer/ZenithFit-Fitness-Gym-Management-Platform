"use server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllUsers() {
  const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
  return res.json();
}

export async function updateUser(email, data) {
  const res = await fetch(`${baseUrl}/api/users/${email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
