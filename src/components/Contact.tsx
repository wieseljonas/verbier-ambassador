"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, Mail, MapPin, Check, ExternalLink } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="section-padding bg-alpine-50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-600 tracking-[0.2em] uppercase text-sm mb-4">
              Ready to Book?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-alpine-900 mb-8">
              Secure Your
              <br />
              <span className="italic font-light">Perfect Stay</span>
            </h2>
            <p className="text-alpine-600 leading-relaxed mb-8">
              The Ambassador is one of the most sought-after locations in Verbier. 
              Contact us directly for the best rates and personalized service, or 
              book instantly through Airbnb.
            </p>

            {/* Airbnb CTA */}
            <a
              href="https://www.airbnb.ch/rooms/54289819"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] text-white font-medium tracking-wider uppercase text-sm hover:opacity-90 transition-opacity mb-10"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.4c-.3.6-1.1 1.1-2.1 1.1-1.5 0-2.5-1-3.4-2.2-.9 1.2-1.9 2.2-3.4 2.2-1 0-1.8-.5-2.1-1.1-.4-.8-.3-1.8.3-3.1l2.9-6.1c.2-.4.5-.6.9-.6s.7.2.9.6l2.9 6.1c.6 1.3.7 2.3.1 3.1z"/>
              </svg>
              Book on Airbnb
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-alpine-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-alpine-500 text-sm">Direct Inquiries</p>
                  <a
                    href="mailto:stay@theambassador-verbier.ch"
                    className="text-alpine-900 hover:text-gold-600 transition-colors"
                  >
                    stay@theambassador-verbier.ch
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-alpine-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-alpine-500 text-sm">Address</p>
                  <p className="text-alpine-900">
                    Chemin de la Barmète 17
                    <br />
                    1936 Verbier, Switzerland
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center bg-alpine-100 p-12 text-center">
                <div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-alpine-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-alpine-600">
                    We've received your inquiry and will respond within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-alpine-200 p-8 md:p-10"
              >
                <h3 className="font-serif text-xl text-alpine-900 mb-6">
                  Or send us a direct inquiry
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-alpine-700 text-sm mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-alpine-700 text-sm mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-alpine-700 text-sm mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors"
                      placeholder="+41 79 xxx xx xx"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-alpine-700 text-sm mb-2"
                    >
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="">Select guests</option>
                      <option value="1-2">1-2 guests</option>
                      <option value="3-4">3-4 guests</option>
                      <option value="5-6">5-6 guests</option>
                      <option value="7-8">7-8 guests</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="dates"
                    className="block text-alpine-700 text-sm mb-2"
                  >
                    Preferred Dates *
                  </label>
                  <input
                    type="text"
                    id="dates"
                    name="dates"
                    required
                    value={formData.dates}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors"
                    placeholder="e.g., Feb 15-22, 2025"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-alpine-700 text-sm mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-alpine-200 bg-alpine-50 text-alpine-900 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    placeholder="Tell us about your trip..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-alpine-900 text-white font-medium tracking-wider uppercase text-sm hover:bg-alpine-800 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
