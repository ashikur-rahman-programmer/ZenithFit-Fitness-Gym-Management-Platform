const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchAllClasses = async () => {
  const res = await fetch(`${baseUrl}/api/classes`, { cache: "no-store" });
  return res.json();
};
export const fetchAdminAllClasses = async () => {
  const res = await fetch(`${baseUrl}/api/admin/classes`, {
    cache: "no-store",
  });
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

export const getApprovedClasses = async (params) => {
  try {
    const { search = "", category = "all", page = 1 } = params;

    const safeSearch = encodeURIComponent(search);
    const safeCategory = encodeURIComponent(category);

    const url = `${baseUrl}/api/classes?search=${safeSearch}&category=${safeCategory}&page=${page}&limit=9`;

    const res = await fetch(url, { cache: "no-store" });

    // রেসপন্স ঠিক না থাকলে এরর থ্রো করবে
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching classes:", error);

    return { classes: [], totalPages: 1 };
  }
};
