const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchAllClasses = async () => {
  const res = await fetch(`${baseUrl}/api/classes`, { cache: "no-store" });
  return res.json();
};

export const updateClassStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/classes/status/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const deleteClass = async (id) => {
  const res = await fetch(`${baseUrl}/api/classes/${id}`, { method: "DELETE" });
  return res.json();
};
