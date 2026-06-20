import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe"; // আপনার অথ কনফিগারেশন পাথ
import { ObjectId } from "mongodb";
import { auth, db } from "@/lib/auth";

export async function POST(req) {
  try {
    // ১. অথ চেক করুন
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ২. রিকোয়েস্ট বডি থেকে classId নিন
    const { classId } = await req.json();

    // ৩. ডাটাবেস থেকে ক্লাসের তথ্য নিন (নিরাপত্তার জন্য সার্ভার সাইডে দাম চেক করা জরুরি)
    const classData = await db
      .collection("classes")
      .findOne({ _id: new ObjectId(classId) });
    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    // ৪. স্ট্রাইপ চেকআউট সেশন তৈরি করুন
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: classData.name,
              images: [classData.image],
            },
            unit_amount: Math.round(classData.price * 100), // সেন্টে কনভার্ট
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email,
        classId: classId,
        className: classData.name,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/classes/${classId}`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { headers } from "next/headers";

// import { stripe } from "../../../lib/stripe";

// export async function POST() {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: "{{PRICE_ID}}",
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 },
//     );
//   }
// }
