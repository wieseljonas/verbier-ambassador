"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mountain, Plane, Train, Wine, Beer, Utensils, ShoppingBag } from "lucide-react";

const walkingDistances = [
  {
    icon: Mountain,
    name: "Médran Cable Car",
    distance: "2 min",
    description: "Main ski lift access",
  },
  {
    icon: Wine,
    name: "Farinet",
    distance: "1 min",
    description: "Legendary après-ski bar",
  },
  {
    icon: Beer,
    name: "Pub Mont Fort",
    distance: "2 min",
    description: "Iconic Verbier pub",
  },
  {
    icon: Utensils,
    name: "Restaurants & Shops",
    distance: "1 min",
    description: "Village center",
  },
];

const travelDistances = [
  {
    icon: Plane,
    name: "Geneva Airport",
    distance: "2h drive",
  },
  {
    icon: Train,
    name: "Le Châble Station",
    distance: "10 min",
  },
];

const activities = [
  {
    season: "Winter",
    items: [
      "412km of ski runs",
      "World-class off-piste",
      "Verbier Xtreme freeride",
      "Legendary après-ski",
      "Mont Fort glacier skiing",
    ],
  },
  {
    season: "Summer",
    items: [
      "Epic mountain biking",
      "Hiking trails galore",
      "Golf at Les Esserts",
      "Paragliding",
      "Verbier Festival",
    ],
  },
];

export function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" ref={ref} className="section-padding bg-alpine-900">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold-400 tracking-[0.2em] uppercase text-sm mb-4">
            Unbeatable Location
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Everything is <span className="italic font-light">Walking Distance</span>
          </h2>
          <p className="text-alpine-300 max-w-2xl mx-auto">
            Chemin de la Barmète 17 — arguably the most coveted address in Verbier. 
            You simply cannot be more central than this.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Distances */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Walking Distances - The Star Feature */}
            <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">🚶</span> On Foot
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {walkingDistances.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-5 bg-gradient-to-br from-gold-600/20 to-gold-600/5 border border-gold-500/30 hover:border-gold-400/50 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-gold-400 mb-3" />
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gold-300 text-2xl font-serif mt-1">{item.distance}</p>
                  <p className="text-alpine-400 text-xs mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Travel Distances */}
            <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">✈️</span> Getting Here
            </h3>
            <div className="flex gap-4">
              {travelDistances.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-3 bg-alpine-800/50 border border-alpine-700 flex-1"
                >
                  <item.icon className="w-5 h-5 text-alpine-400" />
                  <div>
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-alpine-400 text-xs">{item.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Activities + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Activities */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              {activities.map((activity) => (
                <div key={activity.season}>
                  <h3 className="font-serif text-xl text-white mb-4">
                    {activity.season === "Winter" ? "❄️" : "☀️"} {activity.season}
                  </h3>
                  <ul className="space-y-2">
                    {activity.items.map((item) => (
                      <li
                        key={item}
                        className="text-alpine-300 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gold-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-alpine-800 border border-alpine-700 flex items-center justify-center relative overflow-hidden">
              <div className="text-center p-8 relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-600/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-serif text-xl text-white mb-1">
                  Chemin de la Barmète 17
                </h3>
                <p className="text-alpine-400 text-sm mb-4">
                  1936 Verbier, Switzerland
                </p>
                <a
                  href="https://maps.google.com/?q=Chemin+de+la+Barmète+17,+1936+Verbier,+Switzerland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-600 text-white text-sm font-medium tracking-wider uppercase hover:bg-gold-500 transition-colors"
                >
                  View on Map
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
