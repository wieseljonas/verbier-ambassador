"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Bed, Users, Bath } from "lucide-react";

const bedrooms = [
  {
    name: "Master Suite",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2880&auto=format&fit=crop",
    bedType: "King Bed",
    guests: 2,
    features: ["En-suite bathroom", "Mountain view", "Walk-in closet", "Balcony access"],
    hasEnsuite: true,
  },
  {
    name: "Alpine Suite",
    image:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2942&auto=format&fit=crop",
    bedType: "Queen Bed",
    guests: 2,
    features: ["En-suite bathroom", "Forest view", "Smart TV"],
    hasEnsuite: true,
  },
  {
    name: "Twin Room",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop",
    bedType: "2 Single Beds",
    guests: 2,
    features: ["Shared bathroom", "Mountain view", "Desk area"],
    hasEnsuite: false,
  },
  {
    name: "Cozy Room",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2880&auto=format&fit=crop",
    bedType: "Queen Bed",
    guests: 2,
    features: ["Shared bathroom", "Garden view", "Reading nook"],
    hasEnsuite: false,
  },
];

export function Bedrooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bedrooms" ref={ref} className="section-padding bg-alpine-100/50">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-gold-600 tracking-[0.2em] uppercase text-sm mb-4">
            Rest & Retreat
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-alpine-900">
            The <span className="italic font-light">Bedrooms</span>
          </h2>
          <p className="mt-6 text-alpine-600 max-w-2xl mx-auto">
            Four beautifully appointed bedrooms, each designed as a peaceful haven
            with premium linens, blackout curtains, and thoughtful touches.
          </p>
        </motion.div>

        {/* Bedrooms Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {bedrooms.map((bedroom, index) => (
            <motion.div
              key={bedroom.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white border border-alpine-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] image-hover">
                <Image
                  src={bedroom.image}
                  alt={bedroom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl text-alpine-900 mb-4">
                  {bedroom.name}
                </h3>

                {/* Icons Row */}
                <div className="flex items-center gap-6 mb-4 text-alpine-600">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{bedroom.bedType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{bedroom.guests} Guests</span>
                  </div>
                  {bedroom.hasEnsuite && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">En-suite</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-wrap gap-2">
                  {bedroom.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs text-alpine-500 bg-alpine-50 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

