import ManageTrainers from "@/components/dashboard/admin/ManageTrainers";
import { getPendingTrainers } from "@/lib/api/TrainerManage";

export const metadata = {
  title: "Manage Applicant Trainers",
  description: "Browse through our expert-led fitness sessions",
};

export default async function TrainersPage() {
  const applications = await getPendingTrainers();

  return <ManageTrainers initialApplications={applications} />;
}
