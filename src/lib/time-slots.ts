export type TimeSlot = {
  id: string;
  label: string;
  range: string;
  group: "hourly" | "package" | "special";
  /** Billable hours used for space rate totals. */
  hours: number;
  /** Confirm with studio before charging — not auto-priced. */
  onRequest?: boolean;
};

/** Standard WAFFI studio booking windows (9:00 AM – 6:00 PM), plus special on-request slots. */
export const timeSlots: TimeSlot[] = [
  { id: "09-10", label: "1 hour", range: "9:00 AM – 10:00 AM", group: "hourly", hours: 1 },
  { id: "10-11", label: "1 hour", range: "10:00 AM – 11:00 AM", group: "hourly", hours: 1 },
  { id: "11-12", label: "1 hour", range: "11:00 AM – 12:00 PM", group: "hourly", hours: 1 },
  { id: "12-13", label: "1 hour", range: "12:00 PM – 1:00 PM", group: "hourly", hours: 1 },
  { id: "13-14", label: "1 hour", range: "1:00 PM – 2:00 PM", group: "hourly", hours: 1 },
  { id: "14-15", label: "1 hour", range: "2:00 PM – 3:00 PM", group: "hourly", hours: 1 },
  { id: "15-16", label: "1 hour", range: "3:00 PM – 4:00 PM", group: "hourly", hours: 1 },
  { id: "16-17", label: "1 hour", range: "4:00 PM – 5:00 PM", group: "hourly", hours: 1 },
  { id: "17-18", label: "1 hour", range: "5:00 PM – 6:00 PM", group: "hourly", hours: 1 },
  { id: "half-day-morning", label: "Half day", range: "9:00 AM – 1:00 PM", group: "package", hours: 4 },
  { id: "half-day-afternoon", label: "Half day", range: "1:00 PM – 6:00 PM", group: "package", hours: 5 },
  { id: "full-day", label: "Full day", range: "9:00 AM – 6:00 PM", group: "package", hours: 9 },
  {
    id: "after-6pm",
    label: "After 6:00 PM",
    range: "Special evening booking",
    group: "special",
    hours: 0,
    onRequest: true,
  },
];

export function formatTimeSlot(slot: TimeSlot) {
  const base = `${slot.label} (${slot.range})`;
  return slot.onRequest ? `${base} · on request` : base;
}
