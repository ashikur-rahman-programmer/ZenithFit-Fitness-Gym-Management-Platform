import { notFound } from "next/navigation";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getClassDetailsWithStatus } from "@/lib/action/classDetailsActions";
import ActionButtons from "@/components/BookNow";

export default async function ClassDetailsPage({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  const result = await getClassDetailsWithStatus(id, userEmail);
  if (!result || !result.classData) return notFound();

  const { classData, statusData } = result;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-6 lg:p-12">
      <div className="max-w-6xl mx-auto bg-[#111111] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 bg-white/5">
          <Image
            src={classData.image || "https://via.placeholder.com/800x400"}
            alt={classData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2">
            <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg md:rounded-xl border border-white/10 font-bold text-red-500 text-sm">
              {classData.category}
            </span>
            {classData.status === "Approved" && (
              <span className="bg-green-500/10 backdrop-blur-md px-4 py-2 rounded-lg md:rounded-xl border border-green-500/20 font-bold text-green-500 flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} /> Verified
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {classData.name}
              </h1>

              {/* Metadata Grid - মোবাইল ভিউতে ১ কলাম, ট্যাবলেটে ২ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MetadataItem
                  icon={<User size={18} />}
                  text={classData.trainerName || "Expert Trainer"}
                />
                <MetadataItem
                  icon={<Activity size={18} />}
                  text={`Difficulty: ${classData.difficulty}`}
                />
                <MetadataItem
                  icon={<CalendarDays size={18} />}
                  text={classData.schedule}
                />
                <MetadataItem
                  icon={<Clock size={18} />}
                  text={`${classData.duration} Mins`}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold mb-4">About this class</h3>
              <p className="text-white/60 leading-relaxed text-base md:text-lg">
                {classData.description}
              </p>
            </div>
          </div>

          {/* Pricing & Actions - স্টিকি কার্ড */}
          <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl border border-white/5 h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="text-white/50 font-medium">Class Price</span>
              <span className="text-3xl md:text-4xl font-bold flex items-center">
                <DollarSign size={24} className="text-red-500" />
                {classData.price}
              </span>
            </div>

            <ActionButtons
              classData={classData}
              userEmail={userEmail}
              initialStatus={statusData}
            />

            <p className="text-center text-white/30 text-xs">
              Secure payment processed via our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ছোট কম্পোনেন্ট কোড কমানোর জন্য
function MetadataItem({ icon, text }) {
  return (
    <span className="flex items-center gap-3 bg-white/5 p-3 rounded-lg text-sm md:text-base border border-white/5">
      <span className="text-red-500">{icon}</span> {text}
    </span>
  );
}
