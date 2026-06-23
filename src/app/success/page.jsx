import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  if (!session_id) throw new Error("Please provide a valid session_id");

  // ১. ইউজার সেশন ও রোল চেক
  const userSession = await auth.api.getSession({ headers: await headers() });
  const role = userSession?.user?.role || "user";

  // ২. স্ট্রাইপ সেশন ভেরিফাই
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") return redirect("/");

  if (session.status === "complete") {
    const { userId, classId, userEmail, className } = session.metadata;

    // ৩. ব্যাকএন্ডের POST API কল করা (বুকিং এবং কাউন্ট আপডেটের জন্য)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          classId,
          email: userEmail,
          className,
          paymentIntent: session.payment_intent.id,
          amount: session.amount_total / 100,
        }),
      });
    } catch (err) {
      console.error("Failed to sync booking with backend:", err);
    }

    // ৪. সাকসেস UI
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6">
        <div className="max-w-md w-full bg-[#111111] p-10 rounded-[2rem] border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Payment Successful!
            </h1>
            <p className="text-white/60 text-sm">
              Your booking for{" "}
              <span className="text-white font-semibold">{className}</span> is
              confirmed.
            </p>
          </div>
          <Link
            href={`/dashboard/${role}`}
            className="block w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 transition-all transform hover:scale-[1.02]"
          >
            Go to {role === "admin" ? "Admin" : "My"} Dashboard
          </Link>
        </div>
      </section>
    );
  }
}
