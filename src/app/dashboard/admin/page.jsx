import AdminOverview from "@/components/dashboard/admin/AdminOverview";

async function getStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin-stats`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return <AdminOverview initialStats={stats} />;
}
