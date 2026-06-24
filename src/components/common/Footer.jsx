"use client";

import React from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Framer Motion ইমপোর্ট

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathName = usePathname();

  if (pathName.includes("/dashboard")) return null;

  return (
    // মেইন ফুটার কন্টেইনারে মোশন যোগ করা হয়েছে
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#111111] border-t border-white/10 text-white py-12 px-4"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="ZenithFit Home"
          >
            <Image
              src="/logo.jpg"
              alt="zenithfit logo"
              width={150}
              height={120}
            />
          </Link>
          <p className="text-white/60 text-sm">
            Empowering your fitness journey with professional trainers, modern
            classes, and a vibrant community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            {["Home", "All Classes", "Community Forum"].map((item, i) => (
              <li key={i}>
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "All Classes"
                        ? "/all-classes"
                        : "/community"
                  }
                  className="hover:text-red-500 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@zenithfit.com
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4">
            {[FaXTwitter, FaFacebook, FaInstagram, FaLinkedin].map(
              (Icon, i) => (
                <motion.div key={i} whileHover={{ y: -5 }}>
                  <Link
                    href="#"
                    className="p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all block"
                  >
                    <Icon size={18} />
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/40 text-xs">
        <p>© {currentYear} ZenithFit. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
