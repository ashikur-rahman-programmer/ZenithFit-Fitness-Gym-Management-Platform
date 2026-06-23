"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FiLock, FiMail, FiUser, FiImage } from "react-icons/fi";
import {
  Button,
  Input,
  Label,
  TextField,
  FieldError,
  Description,
  Form,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Link ইম্পোর্ট নিশ্চিত করুন

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(formData.entries());

    await authClient.signUp.email(
      {
        name,
        email,
        password,
        image: imageUrl,
        role: "user",
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push("/");
        },
        onError: (ctx) => toast.error(ctx.error.message || "Failed to sign up"),
      },
    );
    setLoading(false);
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
            Join the <br /> <span className="text-red-600">ZenithFit</span>{" "}
            Elite.
          </h1>
          <p className="text-white/70 text-lg">
            Your fitness journey starts here.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          {/* লগইন লিংক এখানে যোগ করা হয়েছে */}
          <p className="text-white/50 mb-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

          <Form onSubmit={onSubmit} className="space-y-6">
            <TextField isRequired name="name" className="w-full">
              <Label className="flex items-center gap-2 mb-2 text-xs uppercase text-white/50">
                <FiUser className="text-red-500" /> Full Name
              </Label>
              <Input
                placeholder="Enter your name"
                variant="bordered"
                size="lg"
              />
            </TextField>

            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="flex items-center gap-2 mb-2 text-xs uppercase text-white/50">
                <FiMail className="text-red-500" /> Email
              </Label>
              <Input
                placeholder="Enter your email"
                variant="bordered"
                size="lg"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 text-xs uppercase text-white/50">
                <FiImage className="text-red-500" /> Profile Image
              </Label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-600 file:text-white cursor-pointer border border-white/10 rounded-xl"
              />
            </div>

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
              <Description className="text-[10px] text-white/40 mt-2">
                Min 8 characters, 1 uppercase & 1 number.
              </Description>
            </TextField>

            <Button
              type="submit"
              className="w-full bg-red-600 text-white font-bold h-12 rounded-xl"
              isLoading={loading}
            >
              {loading ? "Registering..." : "Register Account"}
            </Button>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}
