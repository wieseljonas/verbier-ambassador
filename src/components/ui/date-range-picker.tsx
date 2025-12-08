"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { format, subDays, subMonths, subYears, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  className?: string;
  initialDateFrom?: Date | string;
  initialDateTo?: Date | string;
  onUpdate?: (values: { range: DateRange }) => void;
  align?: "start" | "center" | "end";
  locale?: string;
  showCompare?: boolean;
}

const PRESETS = [
  { name: "Today", value: 0 },
  { name: "Tomorrow", value: 1 },
  { name: "This Week", value: 7 },
  { name: "Next 2 Weeks", value: 14 },
  { name: "Next Month", value: 30 },
  { name: "Next 3 Months", value: 90 },
];

export function DateRangePicker({
  className,
  initialDateFrom,
  initialDateTo,
  onUpdate,
  align = "end",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    let from: Date | undefined = undefined;
    let to: Date | undefined = undefined;

    if (initialDateFrom) {
      from = typeof initialDateFrom === "string" ? new Date(initialDateFrom) : initialDateFrom;
    }
    if (initialDateTo) {
      to = typeof initialDateTo === "string" ? new Date(initialDateTo) : initialDateTo;
    }

    return from || to ? { from, to } : undefined;
  });

  const [month, setMonth] = React.useState<Date>(range?.from || new Date());

  const handlePresetClick = (days: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (days === 0) {
      setRange({ from: today, to: today });
    } else {
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + days);
      setRange({ from: today, to: endDate });
    }
  };

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
  };

  const handleApply = () => {
    if (range) {
      onUpdate?.({ range });
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !range && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
              </>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex">
          {/* Presets sidebar */}
          <div className="flex flex-col gap-1 border-r p-2">
            <p className="px-2 py-1 text-xs font-medium text-muted-foreground">Quick Select</p>
            {PRESETS.map((preset) => (
              <Button
                key={preset.name}
                variant="ghost"
                size="sm"
                className="justify-start text-xs"
                onClick={() => handlePresetClick(preset.value)}
              >
                {preset.name}
              </Button>
            ))}
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonth}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t pt-3">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply} disabled={!range?.from || !range?.to}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


