"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker, DateRange } from "react-day-picker";
import {
  format,
  differenceInDays,
  addDays,
  isBefore,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { Loader2, X, Calendar, ArrowRight } from "lucide-react";
import "react-day-picker/dist/style.css";

interface BookedRange {
  start: string;
  end: string;
  summary?: string;
}

const MIN_NIGHTS = 3;

// Daily prices from Airbnb calendar
function getDailyPrice(date: Date): number | null {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (year === 2025) {
    if (month === 9 || month === 10) return 590;
    if (month === 11) {
      if (day <= 5) return 1200;
      if (day <= 13) return 1250;
      if (day <= 20) return 1400;
      return 1890;
    }
  }

  if (year === 2026) {
    if (month === 0) {
      if (day <= 3) return 1890;
      if (day <= 10) return 1550;
      if (day <= 24) return 1250;
      return 1350;
    }
    if (month === 1) {
      if (day <= 7) return 1450;
      if (day <= 14) return 1600;
      return 1590;
    }
    if (month >= 2) return 1150;
  }

  if (year >= 2027) return 1150;
  return null;
}

export function AvailabilityCalendar() {
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch("/api/availability");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setBookedRanges(data.bookedRanges);
      } catch (err) {
        setError("Unable to load availability");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [pickerOpen]);

  // Convert booked ranges to Date objects for the picker
  const bookedDates = useMemo(() => {
    const dates: Date[] = [];
    bookedRanges.forEach((range) => {
      const start = new Date(range.start);
      const end = new Date(range.end);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
    });
    return dates;
  }, [bookedRanges]);

  // Check if a date is booked
  const isDateBooked = useCallback(
    (date: Date) => {
      return bookedDates.some(
        (bookedDate) =>
          bookedDate.toDateString() === date.toDateString()
      );
    },
    [bookedDates]
  );

  // Check if range contains booked dates
  const rangeContainsBookedDates = useCallback(
    (from: Date, to: Date) => {
      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        if (isDateBooked(d)) return true;
      }
      return false;
    },
    [isDateBooked]
  );

  // Calculate total price
  const { totalPrice, nightCount, meetsMinStay } = useMemo(() => {
    if (!range?.from || !range?.to)
      return { totalPrice: 0, nightCount: 0, meetsMinStay: false };

    let total = 0;
    const nights = differenceInDays(range.to, range.from);

    for (let d = new Date(range.from); d < range.to; d.setDate(d.getDate() + 1)) {
      const price = getDailyPrice(d);
      if (price) total += price;
    }

    return {
      totalPrice: total,
      nightCount: nights,
      meetsMinStay: nights >= MIN_NIGHTS,
    };
  }, [range]);

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) {
      setRange(undefined);
      return;
    }

    // If selecting end date, check for booked dates in range
    if (newRange.from && newRange.to) {
      if (rangeContainsBookedDates(newRange.from, newRange.to)) {
        // Reset to just the new end date as start
        setRange({ from: newRange.to, to: undefined });
        return;
      }
    }

    setRange(newRange);

    // Close picker when full range is selected
    if (newRange.from && newRange.to) {
      setTimeout(() => setPickerOpen(false), 300);
    }
  };

  const clearSelection = () => {
    setRange(undefined);
  };

  const formatDate = (date: Date) => {
    return format(date, "EEE, MMM d, yyyy");
  };

  const formatShortDate = (date: Date) => {
    return format(date, "MMM d");
  };

  // Disabled dates: past dates and booked dates
  const disabledDays = [
    { before: startOfDay(new Date()) },
    ...bookedDates.map((d) => startOfDay(d)),
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-alpine-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selection Panel - Always Visible */}
      <div
        ref={pickerRef}
        className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-4 md:p-6 relative"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-3">
              <Calendar className="w-4 h-4" />
              <span>Select Your Dates</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Check-in - Clickable */}
              <button
                onClick={() => setPickerOpen(true)}
                className={`text-left px-4 py-3 rounded-xl transition-all ${
                  pickerOpen && !range?.to
                    ? "bg-gold-500/30 ring-2 ring-gold-500"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <p
                  className={`text-xs mb-0.5 ${
                    pickerOpen && !range?.to
                      ? "text-gold-400"
                      : "text-alpine-400"
                  }`}
                >
                  Check-in
                </p>
                <p className="font-medium text-sm md:text-base text-white">
                  {range?.from ? formatDate(range.from) : "Select date"}
                </p>
              </button>

              <ArrowRight className="w-5 h-5 text-gold-500 flex-shrink-0" />

              {/* Check-out - Clickable */}
              <button
                onClick={() => setPickerOpen(true)}
                className={`text-left px-4 py-3 rounded-xl transition-all ${
                  pickerOpen && range?.from && !range?.to
                    ? "bg-gold-500/30 ring-2 ring-gold-500"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <p
                  className={`text-xs mb-0.5 ${
                    pickerOpen && range?.from && !range?.to
                      ? "text-gold-400"
                      : "text-alpine-400"
                  }`}
                >
                  Check-out
                </p>
                <p className="font-medium text-sm md:text-base text-white">
                  {range?.to ? formatDate(range.to) : "Select date"}
                </p>
              </button>
            </div>
          </div>

          {/* Price & Book Section */}
          <div className="flex items-center gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {range?.to ? (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center md:text-right"
                >
                  <p
                    className={`text-xs mb-0.5 ${
                      meetsMinStay ? "text-alpine-400" : "text-red-400"
                    }`}
                  >
                    {nightCount} night{nightCount !== 1 ? "s" : ""}
                    {!meetsMinStay && ` (min ${MIN_NIGHTS})`}
                  </p>
                  <p
                    className={`text-2xl md:text-3xl font-bold ${
                      meetsMinStay ? "text-gold-400" : "text-alpine-500"
                    }`}
                  >
                    {totalPrice.toLocaleString()}{" "}
                    <span className="text-lg">CHF</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center md:text-right text-alpine-500"
                >
                  <p className="text-xs mb-0.5">Min {MIN_NIGHTS} nights</p>
                  <p className="text-2xl md:text-3xl font-bold">— CHF</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              href={
                meetsMinStay
                  ? `/#contact?checkin=${range?.from?.toISOString()}&checkout=${range?.to?.toISOString()}`
                  : "#"
              }
              className={`font-semibold px-4 py-2 rounded-lg transition-all text-sm whitespace-nowrap ${
                meetsMinStay
                  ? "bg-gold-500 hover:bg-gold-400 text-alpine-950 cursor-pointer"
                  : "bg-alpine-700 text-alpine-500 cursor-not-allowed"
              }`}
              whileHover={meetsMinStay ? { scale: 1.02 } : {}}
              whileTap={meetsMinStay ? { scale: 0.98 } : {}}
              onClick={(e) => !meetsMinStay && e.preventDefault()}
            >
              Book Now
            </motion.a>
          </div>

          {/* Clear button */}
          {(range?.from || range?.to) && (
            <button
              onClick={clearSelection}
              className="absolute top-3 right-3 text-alpine-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Date Picker Dropdown */}
        <AnimatePresence>
          {pickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleSelect}
                numberOfMonths={2}
                disabled={disabledDays}
                fromMonth={new Date()}
                modifiers={{
                  booked: bookedDates,
                }}
                modifiersClassNames={{
                  booked: "rdp-day_booked",
                }}
                classNames={{
                  months: "flex flex-col sm:flex-row gap-4 justify-center",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center text-white",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse",
                  head_row: "flex",
                  head_cell: "text-alpine-400 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal rounded-lg transition-all hover:bg-white/20 text-white flex items-center justify-center",
                  day_range_start: "bg-gold-500 text-alpine-950 rounded-r-none hover:bg-gold-500",
                  day_range_end: "bg-gold-500 text-alpine-950 rounded-l-none hover:bg-gold-500",
                  day_selected: "bg-gold-500 text-alpine-950 hover:bg-gold-500",
                  day_today: "ring-1 ring-gold-500",
                  day_outside: "opacity-30",
                  day_disabled: "text-alpine-600 opacity-50 cursor-not-allowed hover:bg-transparent",
                  day_range_middle: "bg-gold-500/30 text-white rounded-none",
                  day_hidden: "invisible",
                }}
                components={{
                  DayContent: ({ date }) => {
                    const price = getDailyPrice(date);
                    const isBooked = isDateBooked(date);
                    const isPast = isBefore(date, startOfDay(new Date()));

                    return (
                      <div className="flex flex-col items-center">
                        <span>{date.getDate()}</span>
                        {price && !isBooked && !isPast && (
                          <span className="text-[8px] text-alpine-400 leading-none">
                            {price}
                          </span>
                        )}
                      </div>
                    );
                  },
                }}
              />

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gold-500" />
                  <span className="text-alpine-300">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-white/20" />
                  <span className="text-alpine-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-alpine-700 opacity-50" />
                  <span className="text-alpine-300">Unavailable</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick tip when picker is closed */}
      {!pickerOpen && !range?.from && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-alpine-400 text-sm"
        >
          Click on Check-in or Check-out to select your dates
        </motion.p>
      )}
    </div>
  );
}
