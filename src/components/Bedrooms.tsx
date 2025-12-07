"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Bed, Users, Bath } from "lucide-react";

const bedrooms = [
  {
    name: "Kids Room",
    image: "/images/apartment/kids-room.avif",
    bedType: "1 Single + 1 Bunk Bed",
    guests: 3,
    features: ["Mountain view", "Spacious", "Perfect for kids or friends"],
    hasEnsuite: false,
  },
  {
    name: "Master Suite",
    image: "/images/apartment/master-room.avif",
    bedType: "Queen Bed",
    guests: 2,
    features: ["Premium linens", "Elegant design", "Blackout curtains"],
    hasEnsuite: false,
  },
  {
    name: "Double Room",
    image: "/images/apartment/living-room.avif",
    bedType: "Double Bed",
    guests: 2,
    features: ["Cozy atmosphere", "Natural light", "Quality bedding"],
    hasEnsuite: false,
  },
  {
    name: "Sofa Bed",
    image: "/images/apartment/living-room-2.avif",
    bedType: "Double Sofa Bed",
    guests: 2,
    features: ["Panoramic views", "Open living space", "Extra flexibility"],
    hasEnsuite: false,
  },
];

export function Bedrooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="bedrooms"
      ref={ref}
      className="section-padding bg-alpine-100/50"
    >
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
            Three beautifully appointed bedrooms plus a double sofa bed in the
            living room—9 beds in total for ultimate flexibility. Perfect for
            families or groups up to 9 guests.
          </p>
        </motion.div>

        {/* Bedrooms Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bedrooms.map((bedroom, index) => (
            <motion.div
              key={bedroom.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white border border-alpine-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] image-hover">
                <Image
                  src={bedroom.image}
                  alt={bedroom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
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

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white border border-alpine-200 px-6 py-4 rounded-2xl text-alpine-700 shadow-sm">
            <Bath className="w-5 h-5 text-gold-600" />
            <span>
              <strong>2 Bathrooms</strong> — Modern fixtures, bathtub & shower
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
