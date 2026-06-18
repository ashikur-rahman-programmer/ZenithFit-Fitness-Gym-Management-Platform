import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ZenithNavbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZenithFit — Fitness & Gym Management Platform",
  description:
    "A fitness and gym management platform. Built with Next.js, MongoDB, Stripe, BetterAuth, and jwt",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.className}  h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <header>
          <ZenithNavbar />
        </header>
        {children}
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
