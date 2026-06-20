import ClassCard from "@/components/ClassCard";
import ClassFilter from "@/components/ClassFilter";
import Pagination from "@/components/Pagination";
import { getApprovedClasses } from "@/lib/action/classActions";

export default async function ClassesPage({ searchParams }) {
  // Next.js এর নতুন নিয়মে searchParams কে await করে নিতে হয়
  const params = await searchParams;

  const data = await getApprovedClasses(params);
  const classes = data?.classes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-bold text-white">Explore All Classes</h1>
          <p className="text-white/50">
            Browse through our expert-led fitness sessions.
          </p>
        </div>

        <ClassFilter />

        {classes.length === 0 ? (
          <div className="text-center py-20 text-white/50 text-xl border border-white/5 rounded-3xl bg-[#111111]">
            No classes found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        )}

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
