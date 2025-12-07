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
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2787&auto=format&fit=crop"
                alt="The Ambassador living room"
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
              Chemin de la Barmète 17
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
                The Ambassador sits at the absolute epicenter of Verbier's action. 
                Roll out of bed and you're at Médran in 2 minutes. Finish your last 
                run and be sipping champagne at Farinet before your boots are cold. 
                This isn't just location—it's a lifestyle.
              </p>
              <p>
                This beautifully appointed 4-bedroom apartment combines Swiss alpine 
                elegance with modern comfort. Whether you're here for epic powder days, 
                legendary après-ski, or summer adventures in the mountains, The Ambassador 
                puts everything at your doorstep.
              </p>
              <p>
                No shuttles. No taxis. No excuses. Just step outside and you're 
                already there.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-alpine-200">
              <div>
                <span className="font-serif text-4xl text-alpine-900">140</span>
                <p className="text-alpine-500 text-sm mt-1">Square Meters</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-alpine-900">4</span>
                <p className="text-alpine-500 text-sm mt-1">Bedrooms</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-alpine-900">8</span>
                <p className="text-alpine-500 text-sm mt-1">Guests</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
