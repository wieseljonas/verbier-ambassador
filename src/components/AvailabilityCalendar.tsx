"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BookedRange {
  start: string;
  end: string;
  summary?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isBooked: boolean;
  isPast: boolean;
}

function MiniMonth({
  year,
  month,
  bookedDates,
  index,
}: {
  year: number;
  month: number;
  bookedDates: Set<string>;
  index: number;
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
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: true,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isBooked: bookedDates.has(date.toISOString().split("T")[0]),
        isPast: date < today,
      });
    }

    // Fill remaining cells
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: false,
      });
    }

    return days;
  }, [year, month, bookedDates]);

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
          const isAvailable =
            !day.isBooked && !day.isPast && day.isCurrentMonth;

          return (
            <div
              key={i}
              className={`
                aspect-square flex items-center justify-center text-[10px] md:text-xs rounded-md transition-colors
                ${!day.isCurrentMonth ? "opacity-0" : ""}
                ${day.isToday ? "ring-1 ring-gold-500" : ""}
                ${
                  day.isPast && day.isCurrentMonth
                    ? "text-alpine-600"
                    : day.isBooked && day.isCurrentMonth
                    ? "bg-red-500/30 text-red-300"
                    : isAvailable
                    ? "bg-emerald-500/25 text-emerald-300"
                    : "text-alpine-500"
                }
              `}
            >
              {day.isCurrentMonth ? day.date.getDate() : ""}
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
      {/* 12 Month Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {months.map((m, index) => (
          <MiniMonth
            key={`${m.year}-${m.month}`}
            year={m.year}
            month={m.month}
            bookedDates={bookedDates}
            index={index}
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
          <div className="w-3 h-3 md:w-4 md:h-4 rounded border border-gold-500" />
          <span className="text-alpine-300">Today</span>
        </div>
      </div>
    </div>
  );
}
