import ManageUsersClient from "@/components/dashboard/admin/ManageUsersClient";
import { getAllUsers } from "@/lib/api/UserManage";

export default async function Page() {
  const users = await getAllUsers();
  return <ManageUsersClient initialUsers={users} />;
}
