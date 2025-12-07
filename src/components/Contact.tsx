"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Send,
  MapPin,
  Check,
  ExternalLink,
  Calendar,
  User,
  Mail,
  Phone,
  Users,
  MessageSquare,
} from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Booking Inquiry - The Ambassador Verbier`
    );
    const dateRange = `${formatDate(formData.checkIn)} → ${formatDate(
      formData.checkOut
    )}`;
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || "Not provided"}\n` +
        `Guests: ${formData.guests}\n` +
        `Dates: ${dateRange}\n\n` +
        `Message:\n${formData.message || "No additional message"}`
    );

    window.location.href = `mailto:jonas@realadvisor.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl text-alpine-900 placeholder:text-alpine-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.04)] focus:outline-none focus:bg-white focus:border-gold-400/50 focus:shadow-[inset_0_0_0_1px_rgba(212,168,83,0.3),0_0_0_4px_rgba(212,168,83,0.1)] transition-all duration-300";

  const glassCardClasses =
    "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,0.9)]";

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Luxury gradient background with visible orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/50" />
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-br from-amber-200/40 to-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-slate-200/50 to-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/80 to-transparent rounded-full" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gold-600 tracking-[0.25em] uppercase text-xs font-medium mb-6"
            >
              Ready to Book?
            </motion.p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-alpine-900 mb-8 leading-[1.1]">
              Secure Your
              <br />
              <span className="italic font-light bg-gradient-to-r from-alpine-800 to-alpine-600 bg-clip-text text-transparent">
                Perfect Stay
              </span>
            </h2>
            <p className="text-alpine-600 leading-relaxed mb-10 text-lg">
              The Ambassador is one of the most sought-after locations in
              Verbier. Contact us directly for the best rates and personalized
              service.
            </p>

            {/* Airbnb CTA - Liquid Glass Style */}
            <motion.a
              href="https://www.airbnb.ch/rooms/54289819"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-[#FF5A5F] to-[#E84850] text-white font-medium tracking-wide text-sm rounded-2xl shadow-[0_10px_40px_-10px_rgba(255,90,95,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_14px_50px_-10px_rgba(255,90,95,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 mb-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
              <svg
                className="w-5 h-5 relative z-10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.4c-.3.6-1.1 1.1-2.1 1.1-1.5 0-2.5-1-3.4-2.2-.9 1.2-1.9 2.2-3.4 2.2-1 0-1.8-.5-2.1-1.1-.4-.8-.3-1.8.3-3.1l2.9-6.1c.2-.4.5-.6.9-.6s.7.2.9.6l2.9 6.1c.6 1.3.7 2.3.1 3.1z" />
              </svg>
              <span className="relative z-10">Book on Airbnb</span>
              <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Address Card - Glass */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`${glassCardClasses} rounded-3xl p-6 inline-flex items-center gap-5`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-400/20">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-alpine-500 text-sm mb-1">Location</p>
                <p className="text-alpine-900 font-medium">
                  Chemin de la Barmète
                </p>
                <p className="text-alpine-600 text-sm">
                  1936 Verbier, Switzerland
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${glassCardClasses} rounded-[2rem] p-12 text-center`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-400/30"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
                </motion.div>
                <h3 className="font-serif text-3xl text-alpine-900 mb-4">
                  Thank You!
                </h3>
                <p className="text-alpine-600 text-lg">
                  We've received your inquiry and will respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`${glassCardClasses} rounded-[2rem] p-8 md:p-10`}
              >
                <h3 className="font-serif text-2xl text-alpine-900 mb-2">
                  Send an Inquiry
                </h3>
                <p className="text-alpine-500 text-sm mb-8">
                  Get the best rates with a direct booking
                </p>

                <div className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11`}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11`}
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  {/* Phone & Guests */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11`}
                        placeholder="Phone (optional)"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <select
                        id="guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11 appearance-none cursor-pointer`}
                      >
                        <option value="">Number of guests</option>
                        <option value="1-2">1-2 guests</option>
                        <option value="3-4">3-4 guests</option>
                        <option value="5-6">5-6 guests</option>
                        <option value="7-9">7-9 guests</option>
                      </select>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.checkIn}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-alpine-400 pointer-events-none">
                        Check-in
                      </span>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-alpine-400" />
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        required
                        min={
                          formData.checkIn ||
                          new Date().toISOString().split("T")[0]
                        }
                        value={formData.checkOut}
                        onChange={handleChange}
                        className={`${inputClasses} pl-11`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-alpine-400 pointer-events-none">
                        Check-out
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-alpine-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClasses} pl-11 resize-none`}
                      placeholder="Tell us about your trip (optional)"
                    />
                  </div>

                  {/* Submit Button - Liquid Glass Style */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-b from-alpine-800 to-alpine-900 text-white font-medium tracking-wide rounded-2xl shadow-[0_10px_40px_-10px_rgba(26,46,53,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_14px_50px_-10px_rgba(26,46,53,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform relative z-10" />
                    <span className="relative z-10">Send Inquiry</span>
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
