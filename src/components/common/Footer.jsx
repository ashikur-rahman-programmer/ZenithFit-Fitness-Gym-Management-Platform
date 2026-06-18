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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] border-t border-white/10 text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          {/* Logo Section */}
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
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-classes"
                className="hover:text-red-500 transition-colors"
              >
                All Classes
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="hover:text-red-500 transition-colors"
              >
                Community Forum
              </Link>
            </li>
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

        {/* Social & Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <Link
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all"
            >
              <FaXTwitter size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all"
            >
              <FaFacebook size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all"
            >
              <FaInstagram size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-red-600 transition-all"
            >
              <FaLinkedin size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/40 text-xs">
        <p>© {currentYear} ZenithFit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
