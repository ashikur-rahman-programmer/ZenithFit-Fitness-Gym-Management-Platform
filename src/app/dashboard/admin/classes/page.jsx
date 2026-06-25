import ManageClasses from "@/components/dashboard/admin/ManageClasses";
import { fetchAdminAllClasses } from "@/lib/action/classActions";

export const metadata = {
  title: "Manage Classes",
  description: "Browse through our expert-led fitness sessions",
};

export default async function ManageClassesPage() {
  const data = await fetchAdminAllClasses();
  return <ManageClasses initialClasses={data} />;
}
