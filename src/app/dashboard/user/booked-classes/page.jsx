import { Eye, User, Calendar } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBookedClasses } from "@/lib/api/BookingData";

export const metadata = {
  title: "Booked Classes",
  description: "Browse through our expert-led fitness sessions",
};

export default async function BookedClasses() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const bookedClasses = await getBookedClasses(email);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Booked Classes</h1>
        <p className="text-white/50 text-sm">
          Review and manage your upcoming schedule
        </p>
      </div>

      {/* Main Container */}
      <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
        <div className="bg-[#111111] rounded-[23px] overflow-hidden">
          {/* Responsive Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Class
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Trainer
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium">
                    Schedule
                  </th>
                  <th className="px-6 py-5 text-white/40 text-xs uppercase tracking-widest font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookedClasses.length > 0 ? (
                  bookedClasses.map((item) => (
                    <tr
                      key={item._id}
                      className="group hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <td className="px-6 py-5 font-semibold text-white whitespace-nowrap">
                        {item.className}
                      </td>
                      <td className="px-6 py-5 text-white/70 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-red-500" />
                          {item.trainerName || "Trainer"}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Calendar size={14} />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3">
                          <Link href={`/all-classes/${item.classId}`}>
                            {" "}
                            {/* এখানে item.id নয়, item.classId দিন */}
                            <button className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 transition-all flex items-center gap-2">
                              <Eye size={16} className="text-white" /> View
                              Details
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-white/30"
                    >
                      No booked classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
