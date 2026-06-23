export async function getFeaturedClasses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classes/featured`,
    { cache: "no-store" },
  );
  return res.json();
}
