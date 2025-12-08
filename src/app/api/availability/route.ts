import { NextResponse } from "next/server";

const ICAL_URL =
  "https://www.airbnb.com/calendar/ical/54289819.ics?s=a4bd6d3e320f84461b8d7230debaa529";

interface BookedRange {
  start: string;
  end: string;
  summary?: string;
}

export async function GET() {
  try {
    const response = await fetch(ICAL_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch calendar");
    }

    const icalData = await response.text();
    const bookedRanges = parseIcal(icalData);

    return NextResponse.json({ bookedRanges });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

function parseIcal(icalData: string): BookedRange[] {
  const events: BookedRange[] = [];
  const lines = icalData.split("\n");

  let currentEvent: Partial<BookedRange> | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === "BEGIN:VEVENT") {
      currentEvent = {};
    } else if (trimmedLine === "END:VEVENT" && currentEvent) {
      if (currentEvent.start && currentEvent.end) {
        events.push(currentEvent as BookedRange);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (trimmedLine.startsWith("DTSTART")) {
        const dateStr = trimmedLine.split(":")[1];
        currentEvent.start = parseIcalDate(dateStr);
      } else if (trimmedLine.startsWith("DTEND")) {
        const dateStr = trimmedLine.split(":")[1];
        currentEvent.end = parseIcalDate(dateStr);
      } else if (trimmedLine.startsWith("SUMMARY")) {
        currentEvent.summary = trimmedLine.split(":")[1];
      }
    }
  }

  return events;
}

function parseIcalDate(dateStr: string): string {
  // Handle formats like: 20240115 or 20240115T120000Z
  const cleanDate = dateStr.replace(/[TZ]/g, "").substring(0, 8);
  const year = cleanDate.substring(0, 4);
  const month = cleanDate.substring(4, 6);
  const day = cleanDate.substring(6, 8);
  return `${year}-${month}-${day}`;
}
