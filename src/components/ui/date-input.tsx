"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const monthRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value) {
        setMonth(String(value.getMonth() + 1).padStart(2, "0"));
        setDay(String(value.getDate()).padStart(2, "0"));
        setYear(String(value.getFullYear()));
      }
    }, [value]);

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMonth = e.target.value.replace(/\D/g, "").slice(0, 2);
      setMonth(newMonth);
      if (newMonth.length === 2) {
        dayRef.current?.focus();
      }
      updateDate(newMonth, day, year);
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDay = e.target.value.replace(/\D/g, "").slice(0, 2);
      setDay(newDay);
      if (newDay.length === 2) {
        yearRef.current?.focus();
      }
      updateDate(month, newDay, year);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newYear = e.target.value.replace(/\D/g, "").slice(0, 4);
      setYear(newYear);
      updateDate(month, day, newYear);
    };

    const updateDate = (m: string, d: string, y: string) => {
      if (m && d && y && y.length === 4) {
        const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
        if (!isNaN(date.getTime())) {
          onChange?.(date);
        }
      }
    };

    return (
      <div
        className={cn(
          "flex items-center gap-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
          className
        )}
      >
        <input
          ref={monthRef}
          type="text"
          placeholder="MM"
          value={month}
          onChange={handleMonthChange}
          className="w-6 bg-transparent text-center outline-none placeholder:text-muted-foreground"
          {...props}
        />
        <span className="text-muted-foreground">/</span>
        <input
          ref={dayRef}
          type="text"
          placeholder="DD"
          value={day}
          onChange={handleDayChange}
          className="w-6 bg-transparent text-center outline-none placeholder:text-muted-foreground"
        />
        <span className="text-muted-foreground">/</span>
        <input
          ref={yearRef}
          type="text"
          placeholder="YYYY"
          value={year}
          onChange={handleYearChange}
          className="w-10 bg-transparent text-center outline-none placeholder:text-muted-foreground"
        />
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput };


