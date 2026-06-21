import MyClassesClient from "@/components/dashboard/trainer/MyClassesClient";
import { getMyClasses } from "@/lib/api/Trainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return (
      <p className="text-white text-center mt-20">
        Please login to view your classes.
      </p>
    );

  const user = session?.user;
  const data = await getMyClasses(user?.email);

  return <MyClassesClient initialClasses={data.classes} stats={data} />;
}
