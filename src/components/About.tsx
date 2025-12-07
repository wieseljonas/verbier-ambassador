"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-alpine-50 overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] image-hover">
              <Image
                src="/images/apartment/living-room-open-kitchen.avif"
                alt="The Ambassador spacious living room with stunning mountain views"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold-300 -z-10 hidden md:block" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold-600 tracking-[0.2em] uppercase text-sm mb-4">
              Chemin de la Barmète
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-alpine-900 mb-8 leading-tight">
              The Address
              <br />
              <span className="italic font-light">That Says It All</span>
            </h2>
            <div className="space-y-6 text-alpine-700 leading-relaxed">
              <p className="text-lg">
                <strong>There's central, and then there's THIS.</strong>
              </p>
              <p>
                The Ambassador sits at the absolute epicenter of Verbier's
                action. Roll out of bed and you're at Médran in 2 minutes.
                Finish your last run and be sipping champagne at Farinet before
                your boots are cold. This isn't just location—it's a lifestyle.
              </p>
              <p>
                Beautifully renovated in late 2022 with a brand-new kitchen and
                premium finishes throughout. This spacious 3-bedroom apartment
                features 2 bathrooms, an open-plan living area, and a
                breathtaking terrace with panoramic mountain views. Perfect for
                families or groups of friends.
              </p>
              <p>
                No shuttles. No taxis. No excuses. Covered parking included.
                Just step outside and you're already there.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-12 pt-12 border-t border-alpine-200">
              <div>
                <span className="font-serif text-3xl md:text-4xl text-alpine-900">3</span>
                <p className="text-alpine-500 text-sm mt-1">Bedrooms</p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-alpine-900">9</span>
                <p className="text-alpine-500 text-sm mt-1">Guests</p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-alpine-900">9</span>
                <p className="text-alpine-500 text-sm mt-1">Beds</p>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-alpine-900">2</span>
                <p className="text-alpine-500 text-sm mt-1">Bathrooms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
