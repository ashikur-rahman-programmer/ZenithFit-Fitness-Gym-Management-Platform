import Unauthorized from "@/app/unauthorized/page";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
  description: "Browse through our expert-led fitness sessions",
};

async function getStats() {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function AdminOverviewPage() {
  const stats = await getStats();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirect("/auth/login");

  if (session.user.role !== "admin") {
    return <Unauthorized />;
  }

  return <AdminOverview initialStats={stats} />;
}
