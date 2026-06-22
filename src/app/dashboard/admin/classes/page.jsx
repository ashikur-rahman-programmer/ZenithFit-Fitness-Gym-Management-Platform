import ManageClasses from "@/components/dashboard/admin/ManageClasses";
import { fetchAdminAllClasses } from "@/lib/action/classActions";

export default async function ManageClassesPage() {
  const data = await fetchAdminAllClasses();
  return <ManageClasses initialClasses={data} />;
}
