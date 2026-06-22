import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";

async function getPayments() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transaction`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export default async function TransactionsPage() {
  const transactions = await getPayments();
  return <TransactionsTable initialTransactions={transactions} />;
}
