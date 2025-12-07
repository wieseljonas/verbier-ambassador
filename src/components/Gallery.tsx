"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "/images/apartment/living-room.avif",
    alt: "Spacious living room with panoramic mountain views",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/apartment/kitchen.avif",
    alt: "Brand new fully equipped kitchen",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/master-room.avif",
    alt: "Master bedroom with queen bed",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/living-room-2.avif",
    alt: "Cozy living room angle",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/bathroom.avif",
    alt: "Modern bathroom with bathtub",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/view-mountains.avif",
    alt: "Stunning terrace with breathtaking alpine views",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/apartment/back-view.jpeg",
    alt: "View of Verbier village from the terrace",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/kids-room.avif",
    alt: "Kids room with bunk bed and single bed",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/shower-room.avif",
    alt: "Second bathroom with shower",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/apartment/living-room-open-kitchen.avif",
    alt: "Open living area with kitchen",
    span: "col-span-1 row-span-1",
  },
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev !== null ? (prev === galleryImages.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <section id="gallery" ref={ref} className="section-padding bg-alpine-50">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-gold-600 tracking-[0.2em] uppercase text-sm mb-4">
            Visual Tour
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-alpine-900">
            Gallery
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative image-hover cursor-pointer rounded-2xl overflow-hidden ${image.span}`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-alpine-950/0 hover:bg-alpine-950/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-alpine-950/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button - Glass Style */}
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation - Glass Style */}
            <button
              className="absolute left-4 md:left-8 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-4 md:right-8 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
