"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiLock, FiMail } from "react-icons/fi";
import {
  Button,
  Input,
  Label,
  TextField,
  FieldError,
  Form,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Welcome back!");
          router.push("/");
        },
        onError: (ctx) =>
          toast.error(ctx.error.message || "Invalid credentials"),
      },
    );
    setLoading(false);
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-gradient-to-br from-red-600/20 to-[#111111]">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Welcome Back to <br />{" "}
            <span className="text-red-600">ZenithFit</span>
          </h1>
          <p className="text-white/70 text-lg">
            Log in to continue your fitness journey.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-white/50 mb-8">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-red-500 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

          <Form onSubmit={onSubmit} className="space-y-6">
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="flex items-center gap-2 mb-2 text-xs uppercase text-white/50">
                <FiMail className="text-red-500" /> Email
              </Label>
              <Input
                placeholder="Enter your email"
                variant="bordered"
                size="lg"
              />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              className="w-full"
            >
              <Label className="flex items-center gap-2 mb-2 text-xs uppercase text-white/50">
                <FiLock className="text-red-500" /> Password
              </Label>
              <Input
                placeholder="Enter your password"
                variant="bordered"
                size="lg"
              />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white font-bold h-12 rounded-xl"
              isLoading={loading}
            >
              {loading ? "Logging in..." : "Login Account"}
            </Button>

            {/* Google Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="text-xs text-white/30 uppercase">
                Or continue with
              </span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Google Login Button */}
            <Button
              variant="bordered"
              className="w-full text-white border-white/10 hover:bg-white/5 h-12 rounded-xl"
              startContent={<FcGoogle size={20} />}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}
