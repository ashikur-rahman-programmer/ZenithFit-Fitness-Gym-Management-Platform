import AddForumAdmin from "@/components/dashboard/admin/AddForumAdmin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Add Forum Post",
  description: "Browse through our expert-led fitness sessions",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return <p className="text-center text-white mt-10">Unauthorized access.</p>;
  }

  return <AddForumAdmin user={session.user} />;
}
