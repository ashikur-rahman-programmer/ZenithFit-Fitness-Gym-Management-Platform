import ManageAllTrainers from "@/components/dashboard/admin/ManageAllTrainers";

export const metadata = {
  title: "Manage Trainers",
  description: "Browse through our expert-led fitness sessions",
};

async function getTrainers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trainers`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function ManageTrainersPage() {
  const trainers = await getTrainers();

  return <ManageAllTrainers initialTrainers={trainers} />;
}
