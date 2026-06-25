import AddForumPost from "@/components/dashboard/trainer/AddForumPost";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Add Forum Post",
  description: "Browse through our expert-led fitness sessions",
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  // সিকিউরিটি চেক
  if (!session) {
    return <p className="text-center text-white mt-10">Unauthorized access.</p>;
  }

  // ইউজার ডাটা চাইল্ড কম্পোনেন্টে পাস করা হচ্ছে
  return <AddForumPost user={session.user} />;
}
