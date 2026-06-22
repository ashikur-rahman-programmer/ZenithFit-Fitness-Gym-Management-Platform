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

export async function getMyClasses(email) {
  try {
    const res = await fetch(`${baseUrl}/api/trainer/my-classes/${email}`, {
      cache: "no-store",
    });
    if (!res.ok) return { classes: [], pending: 0, approved: 0 };
    return await res.json();
  } catch (error) {
    console.error("Error fetching classes:", error);
    return { classes: [], pending: 0, approved: 0 };
  }
}

export async function getTrainerStats(email) {
  try {
    const data = await getMyClasses(email);

    // মোট ক্লাস = সব ক্লাসের সংখ্যা
    const totalClasses = data.classes ? data.classes.length : 0;

    // মোট এনরোলড স্টুডেন্ট = প্রতিটি ক্লাসের attendees অ্যারের সাইজ যোগফল
    const totalEnrolled = data.classes
      ? data.classes.reduce((acc, cls) => acc + (cls.attendees?.length || 0), 0)
      : 0;

    return { totalClasses, totalEnrolled };
  } catch (error) {
    return { totalClasses: 0, totalEnrolled: 0 };
  }
}

export const updateTrainerRole = async (email, role) => {
  const res = await fetch(`${baseUrl}/api/users/role/${email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
  return await res.json();
};
