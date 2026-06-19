"use server";
// import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addClasses = async (classData) => {
  // jwt
  // const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/classes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classData),
  });
  const data = await res.json();
  return data;
};
