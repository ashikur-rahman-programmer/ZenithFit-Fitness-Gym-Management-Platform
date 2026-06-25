import ApplyAsTrainer from "@/components/dashboard/user/ApplyAsTrainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Apply as Trainer",
  description: "Browse through our expert-led fitness sessions",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return <p>Please login first.</p>;

  return <ApplyAsTrainer user={session.user} />;
}
