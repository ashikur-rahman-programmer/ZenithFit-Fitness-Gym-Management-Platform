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
import ActionButtons from "@/components/ClassDetails";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-[#111111] border border-white/10 rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="relative w-full h-64 md:h-96 bg-white/5">
          <Image
            src={classData.image || "https://via.placeholder.com/800x400"}
            alt={classData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 font-bold text-red-500">
              {classData.category}
            </span>
            {classData.status === "Approved" && (
              <span className="bg-green-500/10 backdrop-blur-md px-4 py-2 rounded-xl border border-green-500/20 font-bold text-green-500 flex items-center gap-2">
                <CheckCircle2 size={16} /> Verified
              </span>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {classData.name}
              </h1>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 text-white/70">
                <span className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                  <User size={18} /> {classData.trainerName || "Expert Trainer"}
                </span>
                <span className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                  <Activity size={18} /> Difficulty:{" "}
                  <span className="text-white font-semibold">
                    {classData.difficulty}
                  </span>
                </span>
                <span className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                  <CalendarDays size={18} /> {classData.schedule}
                </span>
                <span className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                  <Clock size={18} /> {classData.duration} Mins
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold mb-4">About this class</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                {classData.description}
              </p>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="text-white/50 font-medium">Class Price</span>
              <span className="text-4xl font-bold flex items-center">
                <DollarSign size={28} className="text-red-500" />
                {classData.price}
              </span>
            </div>

            <ActionButtons
              classData={classData}
              userEmail={userEmail}
              initialStatus={statusData}
            />

            <p className="text-center text-white/30 text-xs">
              Secure payment processed via our trusted platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
