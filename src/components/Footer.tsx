"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Mail } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "The Apartment" },
  { href: "#gallery", label: "Gallery" },
  { href: "#bedrooms", label: "Bedrooms" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Book Now" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:jonas@realadvisor.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-alpine-950 text-white">
      {/* Main Footer */}
      <div className="container-wide px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              The Ambassador
            </h3>
            <p className="text-alpine-400 leading-relaxed mb-6">
              The most central 3-bedroom apartment in Verbier. Steps from
              Médran, Farinet, and the heart of the action.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-alpine-800 hover:bg-gold-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-alpine-400 mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-alpine-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-alpine-400 mb-6">
              Contact
            </h4>
            <address className="not-italic text-alpine-300 space-y-3">
              <p>Chemin de la Barmète</p>
              <p>1936 Verbier, Switzerland</p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-alpine-800">
        <div className="container-wide px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-alpine-500 text-sm">
            © {new Date().getFullYear()} The Ambassador Verbier. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-alpine-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
