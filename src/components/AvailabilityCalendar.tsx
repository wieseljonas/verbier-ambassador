"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Loader2, X, Calendar, ArrowRight } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

// Mini Month Component for the 12-month overview
function MiniMonth({
  year,
  month,
  bookedDatesSet,
  index,
  selectedStart,
  selectedEnd,
}: {
  year: number;
  month: number;
  bookedDatesSet: Set<string>;
  index: number;
  selectedStart: Date | undefined;
  selectedEnd: Date | undefined;
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

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        dateString: date.toISOString().split("T")[0],
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: true,
        price: null,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split("T")[0];
      const isPast = date < today;
      days.push({
        date,
        dateString,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isBooked: bookedDatesSet.has(dateString),
        isPast,
        price: isPast ? null : getDailyPrice(date),
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        dateString: date.toISOString().split("T")[0],
        isCurrentMonth: false,
        isToday: false,
        isBooked: false,
        isPast: false,
        price: null,
      });
    }

    return days;
  }, [year, month, bookedDatesSet]);

  const isInRange = (dateString: string) => {
    if (!selectedStart || !selectedEnd) return false;
    const startStr = selectedStart.toISOString().split("T")[0];
    const endStr = selectedEnd.toISOString().split("T")[0];
    return dateString >= startStr && dateString <= endStr;
  };

  const isRangeStart = (dateString: string) =>
    selectedStart?.toISOString().split("T")[0] === dateString;
  const isRangeEnd = (dateString: string) =>
    selectedEnd?.toISOString().split("T")[0] === dateString;

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 md:p-4"
    >
      <div className="text-center mb-2">
        <span className="text-white font-medium text-sm">
          {monthName}{" "}
          <span className="text-alpine-400 font-normal">{year}</span>
        </span>
      </div>

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

      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((day, i) => {
          const isAvailable =
            !day.isBooked && !day.isPast && day.isCurrentMonth;
          const inRange = isInRange(day.dateString);
          const isStart = isRangeStart(day.dateString);
          const isEnd = isRangeEnd(day.dateString);

          return (
            <div
              key={i}
              className={`
                aspect-square flex flex-col items-center justify-center text-[10px] md:text-xs rounded-md transition-all
                ${!day.isCurrentMonth ? "opacity-0" : ""}
                ${
                  day.isToday && !inRange && !isStart
                    ? "ring-1 ring-gold-500"
                    : ""
                }
                ${
                  day.isPast && day.isCurrentMonth
                    ? "text-alpine-600"
                    : day.isBooked && day.isCurrentMonth
                    ? "bg-red-500/30 text-red-300"
                    : isStart || isEnd || inRange
                    ? "bg-gold-500/80 text-alpine-950 font-semibold"
                    : isAvailable
                    ? "bg-emerald-500/25 text-emerald-300"
                    : "text-alpine-500"
                }
                ${isStart && selectedEnd ? "rounded-r-none" : ""}
                ${isEnd ? "rounded-l-none" : ""}
                ${inRange && !isStart && !isEnd ? "rounded-none" : ""}
              `}
            >
              <span>{day.isCurrentMonth ? day.date.getDate() : ""}</span>
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
  const [range, setRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);

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

  // Convert booked ranges to Set of date strings
  const bookedDatesSet = useMemo(() => {
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

  // Convert to Date array for Calendar disabled dates
  const bookedDatesArray = useMemo(() => {
    return Array.from(bookedDatesSet).map((d) => new Date(d));
  }, [bookedDatesSet]);

  // Calculate total price
  const { totalPrice, nightCount, meetsMinStay } = useMemo(() => {
    if (!range?.from || !range?.to)
      return { totalPrice: 0, nightCount: 0, meetsMinStay: false };

    let total = 0;
    const nights = differenceInDays(range.to, range.from);

    for (
      let d = new Date(range.from);
      d < range.to;
      d.setDate(d.getDate() + 1)
    ) {
      const price = getDailyPrice(new Date(d));
      if (price) total += price;
    }

    return {
      totalPrice: total,
      nightCount: nights,
      meetsMinStay: nights >= MIN_NIGHTS,
    };
  }, [range]);

  const clearSelection = () => {
    setRange(undefined);
  };

  // Generate next 12 months for overview
  const months = useMemo(() => {
    const result = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      result.push({ year: date.getFullYear(), month: date.getMonth() });
    }
    return result;
  }, []);

  // Disabled dates for the calendar
  const disabledDays = [{ before: new Date() }, ...bookedDatesArray];

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
    <div className="space-y-8">
      {/* Booking Panel */}
      <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 backdrop-blur-lg border border-gold-500/30 rounded-2xl p-4 md:p-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-3">
              <Calendar className="w-4 h-4" />
              <span>Select Your Dates</span>
            </div>

            {/* Date Range Picker */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto justify-start text-left font-normal bg-white/5 border-white/20 hover:bg-white/10 hover:border-gold-500/50 text-white transition-all duration-200",
                    !range && "text-alpine-400",
                    range?.from && "border-gold-500/30"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gold-500" />
                  {range?.from ? (
                    range.to ? (
                      <span className="flex items-center gap-2">
                        <span className="text-gold-400">
                          {format(range.from, "EEE, MMM d")}
                        </span>
                        <ArrowRight className="w-3 h-3 text-alpine-500" />
                        <span className="text-gold-400">
                          {format(range.to, "EEE, MMM d, yyyy")}
                        </span>
                      </span>
                    ) : (
                      <span className="text-gold-400">
                        {format(range.from, "EEE, MMM d, yyyy")}
                      </span>
                    )
                  ) : (
                    <span>Select check-in → check-out</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-4 bg-alpine-900 border border-gold-500/30 shadow-2xl shadow-black/50 rounded-xl"
                align="start"
              >
                <div className="dark-calendar">
                  <ShadcnCalendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    numberOfMonths={2}
                    disabled={disabledDays}
                    className="!bg-transparent"
                    classNames={{
                      months: "flex flex-col md:flex-row gap-4",
                      month: "space-y-4",
                      month_caption:
                        "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium text-white",
                      nav: "flex items-center justify-between absolute inset-x-0 top-0",
                      button_previous:
                        "h-7 w-7 bg-white/10 hover:bg-gold-500/30 rounded p-0 text-white border-0",
                      button_next:
                        "h-7 w-7 bg-white/10 hover:bg-gold-500/30 rounded p-0 text-white border-0",
                      weekdays: "flex",
                      weekday:
                        "text-alpine-400 w-9 font-normal text-[0.8rem] text-center",
                      week: "flex w-full mt-2",
                      day: "relative p-0 text-center",
                      day_button:
                        "h-9 w-9 p-0 font-normal rounded-md text-white hover:bg-white/20 transition-colors aria-selected:opacity-100",
                      selected:
                        "!bg-gold-500 !text-alpine-950 font-semibold hover:!bg-gold-400",
                      range_start:
                        "!bg-gold-500 !text-alpine-950 font-semibold rounded-l-md rounded-r-none",
                      range_end:
                        "!bg-gold-500 !text-alpine-950 font-semibold rounded-r-md rounded-l-none",
                      range_middle: "!bg-gold-500/30 !text-white rounded-none",
                      today: "ring-1 ring-gold-500 text-gold-400",
                      outside: "text-alpine-600 opacity-40",
                      disabled:
                        "text-alpine-700 opacity-40 cursor-not-allowed hover:bg-transparent",
                      hidden: "invisible",
                    }}
                  />
                </div>

                {/* Quick Selection Presets */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-alpine-400 mb-2">Quick select:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "This Weekend", days: 2 },
                      { label: "1 Week", days: 7 },
                      { label: "2 Weeks", days: 14 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          const start = new Date();
                          start.setHours(0, 0, 0, 0);
                          // Find next available start date
                          while (
                            bookedDatesSet.has(
                              start.toISOString().split("T")[0]
                            )
                          ) {
                            start.setDate(start.getDate() + 1);
                          }
                          const end = new Date(start);
                          end.setDate(end.getDate() + preset.days);
                          setRange({ from: start, to: end });
                        }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-gold-500/20 text-alpine-300 hover:text-gold-400 border border-white/10 hover:border-gold-500/30 transition-all"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Price & Book */}
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

          {(range?.from || range?.to) && (
            <button
              onClick={clearSelection}
              className="absolute top-3 right-3 text-alpine-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 12 Month Overview */}
      <div>
        <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold-500" />
          12-Month Availability Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {months.map((m, index) => (
            <MiniMonth
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              bookedDatesSet={bookedDatesSet}
              index={index}
              selectedStart={range?.from}
              selectedEnd={range?.to}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm pt-6">
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
    </div>
  );
}
