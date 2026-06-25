import ClientOverview from "@/components/dashboard/user/ClientOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "User Dashboard",
  description: "Browse through our expert-led fitness sessions",
};

export default async function OverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return <p>Unauthorized</p>;

  const email = encodeURIComponent(session.user.email);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user-stats/${email}`,
    {
      cache: "no-store",
    },
  );

  const stats = await res.json();

  return <ClientOverview user={session.user} stats={stats} />;
}
