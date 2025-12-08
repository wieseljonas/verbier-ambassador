import { Metadata } from "next";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Availability | The Ambassador Verbier",
  description:
    "Check availability and book your stay at The Ambassador, the most central apartment in Verbier.",
};

export default function AvailabilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-alpine-950 via-alpine-900 to-alpine-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-alpine-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 tracking-[0.2em] uppercase text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <span>Real-time Availability</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Check <span className="italic font-light">Availability</span>
          </h1>
          <p className="text-alpine-300 max-w-2xl mx-auto">
            View our real-time calendar synced with Airbnb. Green dates are
            available for booking.
          </p>
        </div>

        {/* Calendar */}
        <div className="max-w-3xl mx-auto mb-16">
          <AvailabilityCalendar />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/#contact"
              className="px-8 py-4 bg-white/95 backdrop-blur-sm text-alpine-900 font-medium tracking-wide text-sm rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white transition-all duration-300"
            >
              Request a Booking
            </a>
            <a
              href="https://www.airbnb.ch/rooms/54289819"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium tracking-wide text-sm rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span>Book on Airbnb</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
