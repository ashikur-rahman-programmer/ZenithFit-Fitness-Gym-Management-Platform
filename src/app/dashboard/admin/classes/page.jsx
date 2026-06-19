import ManageClasses from "@/components/dashboard/admin/ManageClasses";
import { fetchAllClasses } from "@/lib/action/classActions";

export default async function ManageClassesPage() {
  const initialClasses = await fetchAllClasses();
  return <ManageClasses initialClasses={initialClasses} />;
}
