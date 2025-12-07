"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Actual apartment terrace view */}
      <div className="absolute inset-0">
        <Image
          src="/images/apartment/view-mountains.avif"
          alt="Stunning mountain view from The Ambassador apartment in Verbier"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-alpine-950/50 via-alpine-950/30 to-alpine-950/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-gold-300 text-sm md:text-base tracking-[0.2em] uppercase mb-6"
        >
          <MapPin className="w-4 h-4" />
          <span>The Heart of Verbier</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-6"
        >
          The
          <br />
          <span className="italic font-light">Ambassador</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-8"
        >
          You can't get more central than this. Steps from Médran, Farinet & the
          legendary après-ski scene.
        </motion.p>

        {/* Distance Pills - Glass Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            🎿 2 min to Médran
          </span>
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            🍸 1 min to Farinet
          </span>
          <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            🍺 2 min to Pub Mont Fort
          </span>
        </motion.div>

        {/* CTA Buttons - Liquid Glass Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-white/95 backdrop-blur-sm text-alpine-900 font-medium tracking-wide text-sm rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white transition-all duration-300"
          >
            Book Your Stay
          </a>
          <a
            href="#gallery"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium tracking-wide text-sm rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:border-white/40 transition-all duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.a>

      {/* Side Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-1 text-white/60 text-sm"
      >
        <span>3 Bedrooms</span>
        <span>•</span>
        <span>9 Guests</span>
        <span>•</span>
        <span>9 Beds</span>
      </motion.div>
    </section>
  );
}
