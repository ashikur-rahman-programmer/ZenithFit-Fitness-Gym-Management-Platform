import BookingActions from "@/components/BookingActions";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function getClassData(id) {
  // TODO: BACKEND - ডাটাবেস থেকে ক্লাসের তথ্য এবং বুকিং/ফেভারিট স্ট্যাটাস চেক করবেন
  // এই স্যাম্পল ডেটাটি ডাটাবেস থেকে আসবে।
  return {
    id,
    title: "Advanced Power Yoga",
    description:
      "A high-intensity yoga session designed for strength and flexibility...",
    schedule: "Mon, Wed, Fri - 06:00 AM",
  };
}

export default async function ClassDetailsPage({ params }) {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  if (!session) redirect("/login");

  const { id } = await params;
  const classData = await getClassData(id);

  if (!classData) notFound();

  // সার্ভার থেকে স্টেট চেক করা (এটিই আপনার ভ্যালিডেশন লজিক)
  const isBooked = false; // TODO: DB call to check booking
  const isFavorite = false; // TODO: DB call to check favorite

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#111111] p-8 rounded-3xl border border-white/10">
          <h1 className="text-4xl font-bold mb-4">{classData.title}</h1>
          <p className="text-white/60 mb-6">{classData.description}</p>
          <div className="text-sm text-red-500 font-medium bg-red-500/10 p-4 rounded-xl">
            Schedule: {classData.schedule}
          </div>
        </div>

        <BookingActions
          classId={id}
          initialBooked={isBooked}
          initialFavorite={isFavorite}
        />
      </div>
    </div>
  );
}
