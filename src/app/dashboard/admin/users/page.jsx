import ManageUsersClient from "@/components/dashboard/admin/ManageUsersClient";
import { getAllUsers } from "@/lib/api/UserManage";

export const metadata = {
  title: "Manage Users",
  description: "Browse through our expert-led fitness sessions",
};

export default async function Page() {
  const users = await getAllUsers();
  return <ManageUsersClient initialUsers={users} />;
}
