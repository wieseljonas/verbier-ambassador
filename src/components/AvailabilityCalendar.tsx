"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Calendar, ArrowRight } from "lucide-react";

interface BookedRange {
  start: string;
  end: string;
  summary?: string;
}

interface CalendarDay {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isBooked: boolean;
  isPast: boolean;
  price: number | null;
}

// Daily prices from Airbnb calendar
function getDailyPrice(dateString: string): number | null {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // 2025 Pricing
  if (year === 2025) {
    // October & November 2025: 590 CHF
    if (month === 9 || month === 10) return 590;
    
    // December 2025: Variable pricing
    if (month === 11) {
      if (day <= 5) return 1200;
      if (day <= 13) return 1250;
      if (day <= 20) return 1400;
      return 1890; // Dec 21-31
    }
  }

  // 2026 Pricing
  if (year === 2026) {
    // January 2026
    if (month === 0) {
      if (day <= 3) return 1890;
      if (day <= 10) return 1550;
      if (day <= 24) return 1250;
      return 1350; // Jan 25-31
    }
    
    // February 2026
    if (month === 1) {
      if (day <= 7) return 1450;
      if (day <= 14) return 1600;
      return 1590; // Feb 15-28
    }
    
    // March - December 2026: 1150 CHF
    if (month >= 2) return 1150;
  }

  // 2027+ - default pricing
  if (year >= 2027) return 1150;

  return null;
}

function MiniMonth({
  year,
  month,
  bookedDates,
  index,
  selectedStart,
  selectedEnd,
  onDateClick,
  selectionMode,
}: {
  year: number;
  month: number;
  bookedDates: Set<string>;
  index: number;
  selectedStart: string | null;
  selectedEnd: string | null;
  onDateClick: (dateString: string, price: number | null, isBooked: boolean, isPast: boolean) => void;
  selectionMode: "start" | "end";
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthName = new Date(year, month).toLocaleDateString("en-US", {
    month: "short",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days: CalendarDay[] = [];

    // Previous month padding
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      const dateString = date.toISOString().split("T")[0];
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: true,
        price: null,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split("T")[0];
      const isPast = date < today;
      days.push({
        date,
        dateString,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isBooked: bookedDates.has(dateString),
        isPast,
        price: isPast ? null : getDailyPrice(dateString),
      });
    }

    // Fill remaining cells
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const dateString = date.toISOString().split("T")[0];
      days.push({
        date,
        dateString,
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: false,
        price: null,
      });
    }

    return days;
  }, [year, month, bookedDates]);

  const isInRange = (dateString: string) => {
    if (!selectedStart || !selectedEnd) return false;
    return dateString >= selectedStart && dateString <= selectedEnd;
  };

  const isRangeStart = (dateString: string) => dateString === selectedStart;
  const isRangeEnd = (dateString: string) => dateString === selectedEnd;

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 md:p-4"
    >
      {/* Month Header */}
      <div className="text-center mb-2">
        <span className="text-white font-medium text-sm">
          {monthName}{" "}
          <span className="text-alpine-400 font-normal">{year}</span>
        </span>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-alpine-500 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((day, i) => {
          const isAvailable = !day.isBooked && !day.isPast && day.isCurrentMonth;
          const inRange = isInRange(day.dateString);
          const isStart = isRangeStart(day.dateString);
          const isEnd = isRangeEnd(day.dateString);
          const isSelectable = isAvailable && day.price !== null;

          return (
            <div
              key={i}
              onClick={() => {
                if (day.isCurrentMonth) {
                  onDateClick(day.dateString, day.price, day.isBooked, day.isPast);
                }
              }}
              className={`
                aspect-square flex flex-col items-center justify-center text-[10px] md:text-xs rounded-md transition-all relative
                ${!day.isCurrentMonth ? "opacity-0 pointer-events-none" : ""}
                ${day.isToday && !inRange ? "ring-1 ring-gold-500" : ""}
                ${isSelectable ? "cursor-pointer hover:bg-white/20" : "cursor-default"}
                ${
                  day.isPast && day.isCurrentMonth
                    ? "text-alpine-600"
                    : day.isBooked && day.isCurrentMonth
                    ? "bg-red-500/30 text-red-300"
                    : inRange
                    ? "bg-gold-500/80 text-alpine-950 font-semibold"
                    : isAvailable
                    ? "bg-emerald-500/25 text-emerald-300"
                    : "text-alpine-500"
                }
                ${isStart ? "rounded-r-none" : ""}
                ${isEnd ? "rounded-l-none" : ""}
                ${inRange && !isStart && !isEnd ? "rounded-none" : ""}
              `}
            >
              <span>{day.isCurrentMonth ? day.date.getDate() : ""}</span>
              {day.price && day.isCurrentMonth && !day.isPast && !day.isBooked && (
                <span className={`text-[6px] md:text-[7px] leading-none mt-0.5 ${inRange ? "text-alpine-800" : "text-alpine-400"}`}>
                  {day.price}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function AvailabilityCalendar() {
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selection state
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");

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

  const bookedDates = useMemo(() => {
    const dates = new Set<string>();
    bookedRanges.forEach((range) => {
      const start = new Date(range.start);
      const end = new Date(range.end);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        dates.add(d.toISOString().split("T")[0]);
      }
    });
    return dates;
  }, [bookedRanges]);

  // Calculate total price for selected range
  const { totalPrice, nightCount } = useMemo(() => {
    if (!selectedStart || !selectedEnd) return { totalPrice: 0, nightCount: 0 };
    
    let total = 0;
    let nights = 0;
    const start = new Date(selectedStart);
    const end = new Date(selectedEnd);
    
    // Count nights (not including checkout day)
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0];
      const price = getDailyPrice(dateString);
      if (price) {
        total += price;
        nights++;
      }
    }
    
    return { totalPrice: total, nightCount: nights };
  }, [selectedStart, selectedEnd]);

  const handleDateClick = useCallback((dateString: string, price: number | null, isBooked: boolean, isPast: boolean) => {
    // Don't allow selection of booked or past dates
    if (isBooked || isPast || !price) return;

    if (selectionMode === "start") {
      setSelectedStart(dateString);
      setSelectedEnd(null);
      setSelectionMode("end");
    } else {
      // End date selection
      if (dateString <= selectedStart!) {
        // If clicked date is before or same as start, reset and use it as new start
        setSelectedStart(dateString);
        setSelectedEnd(null);
        setSelectionMode("end");
      } else {
        // Check if any booked dates are in the range
        const start = new Date(selectedStart!);
        const end = new Date(dateString);
        let hasBookedInRange = false;
        
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          if (bookedDates.has(d.toISOString().split("T")[0])) {
            hasBookedInRange = true;
            break;
          }
        }
        
        if (hasBookedInRange) {
          // Reset selection if booked dates in range
          setSelectedStart(dateString);
          setSelectedEnd(null);
          setSelectionMode("end");
        } else {
          setSelectedEnd(dateString);
          setSelectionMode("start");
        }
      }
    }
  }, [selectionMode, selectedStart, bookedDates]);

  const clearSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setSelectionMode("start");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Generate next 12 months
  const months = useMemo(() => {
    const result = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      result.push({ year: date.getFullYear(), month: date.getMonth() });
    }
    return result;
  }, []);

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
      {/* Selection Panel */}
      <AnimatePresence>
        {(selectedStart || selectedEnd) && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-4 md:p-6 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {selectedEnd ? "Your Selection" : "Select checkout date"}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-white">
                  <div className="text-center">
                    <p className="text-xs text-alpine-400 mb-0.5">Check-in</p>
                    <p className="font-medium text-sm md:text-base">
                      {selectedStart ? formatDate(selectedStart) : "—"}
                    </p>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  
                  <div className="text-center">
                    <p className="text-xs text-alpine-400 mb-0.5">Check-out</p>
                    <p className="font-medium text-sm md:text-base">
                      {selectedEnd ? formatDate(selectedEnd) : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {selectedEnd && (
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-center md:text-right">
                    <p className="text-xs text-alpine-400 mb-0.5">{nightCount} night{nightCount !== 1 ? "s" : ""}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gold-400">
                      {totalPrice.toLocaleString()} <span className="text-lg">CHF</span>
                    </p>
                  </div>
                  
                  <motion.a
                    href={`/#contact?checkin=${selectedStart}&checkout=${selectedEnd}`}
                    className="bg-gold-500 hover:bg-gold-400 text-alpine-950 font-semibold px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.a>
                </div>
              )}

              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 text-alpine-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!selectedStart && (
        <div className="text-center text-alpine-400 text-sm">
          <p>Click on a date to start selecting your stay</p>
        </div>
      )}

      {/* 12 Month Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {months.map((m, index) => (
          <MiniMonth
            key={`${m.year}-${m.month}`}
            year={m.year}
            month={m.month}
            bookedDates={bookedDates}
            index={index}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onDateClick={handleDateClick}
            selectionMode={selectionMode}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-emerald-500/25" />
          <span className="text-alpine-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-red-500/30" />
          <span className="text-alpine-300">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gold-500/80" />
          <span className="text-alpine-300">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded border border-gold-500" />
          <span className="text-alpine-300">Today</span>
        </div>
      </div>
    </div>
  );
}
