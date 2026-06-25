import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Transactions",
  description: "Browse through our expert-led fitness sessions",
};

async function getPayments() {
  const { token } = await auth.api.getToken({ headers: await headers() });

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transaction`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function TransactionsPage() {
  const transactions = await getPayments();
  return <TransactionsTable initialTransactions={transactions} />;
}
