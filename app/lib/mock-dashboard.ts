/**
 * Placeholder data for the dashboard UI. Nothing here is real — every export
 * gets replaced by a DynamoDB-backed query once the ingestion pipeline exists.
 * Shapes are kept close to what the real records will likely look like so the
 * swap is mostly mechanical.
 */

export type Status = "good" | "warning" | "critical";

export const fleet = {
  name: "Maplewood Residence",
  devices: 12,
  patients: 46,
};

export const todayStats = [
  {
    label: "Doses dispensed",
    value: "142",
    detail: "of 168 scheduled today",
  },
  {
    label: "Adherence (7 days)",
    value: "94.2%",
    detail: "+1.3 pts vs last week",
  },
  {
    label: "Missed doses",
    value: "3",
    detail: "today, all followed up",
  },
  {
    label: "Devices online",
    value: "11/12",
    detail: "1 offline since 9:14 AM",
  },
];

/** Share of scheduled doses taken in each window today, 0–100. */
export const doseWindows = [
  { label: "Morning", time: "8:00 AM", taken: 44, scheduled: 45 },
  { label: "Midday", time: "12:00 PM", taken: 41, scheduled: 43 },
  { label: "Evening", time: "5:00 PM", taken: 39, scheduled: 42 },
  { label: "Bedtime", time: "9:00 PM", taken: 18, scheduled: 38 },
];

export const weeklyAdherence = [
  { day: "Wed", value: 92.1 },
  { day: "Thu", value: 93.4 },
  { day: "Fri", value: 95.0 },
  { day: "Sat", value: 91.7 },
  { day: "Sun", value: 94.8 },
  { day: "Mon", value: 96.2 },
  { day: "Tue", value: 96.5 },
];

export const ADHERENCE_TARGET = 95;

export const upcomingDoses = [
  {
    patient: "Margaret Chen",
    meds: "Metformin 500mg, Lisinopril 10mg",
    time: "5:00 PM",
    device: "RMD-0412",
    status: "Scheduled",
  },
  {
    patient: "Harold Okafor",
    meds: "Donepezil 10mg",
    time: "5:00 PM",
    device: "RMD-0419",
    status: "Scheduled",
  },
  {
    patient: "Doris Lambert",
    meds: "Warfarin 5mg",
    time: "5:15 PM",
    device: "RMD-0433",
    status: "Low stock",
  },
  {
    patient: "Walter Singh",
    meds: "Amlodipine 5mg, Atorvastatin 20mg",
    time: "5:30 PM",
    device: "RMD-0438",
    status: "Device offline",
  },
  {
    patient: "Evelyn Park",
    meds: "Levothyroxine 75mcg",
    time: "6:00 PM",
    device: "RMD-0441",
    status: "Scheduled",
  },
];

export const alerts: {
  status: Status;
  title: string;
  detail: string;
  time: string;
}[] = [
  {
    status: "critical",
    title: "Device offline",
    detail: "East Wing (RMD-0438) hasn't checked in.",
    time: "9:14 AM",
  },
  {
    status: "warning",
    title: "Missed dose",
    detail: "Harold Okafor skipped Donepezil at 12:00 PM.",
    time: "12:30 PM",
  },
  {
    status: "warning",
    title: "Low stock",
    detail: "Warfarin 5mg in Nurses' Station has 2 days left.",
    time: "1:02 PM",
  },
  {
    status: "good",
    title: "Refill completed",
    detail: "Lobby restocked by J. Alvarez.",
    time: "2:45 PM",
  },
];

export const devices: {
  id: string;
  /** Whatever the user calls this dispenser — set when it's added to a fleet. */
  name: string;
  status: Status;
  stockDays: number;
}[] = [
  { id: "RMD-0412", name: "Lobby", status: "good", stockDays: 21 },
  { id: "RMD-0419", name: "Memory Care", status: "good", stockDays: 14 },
  { id: "RMD-0433", name: "Nurses' Station", status: "warning", stockDays: 2 },
  { id: "RMD-0438", name: "East Wing", status: "critical", stockDays: 9 },
  { id: "RMD-0441", name: "Dining Room", status: "good", stockDays: 17 },
];

export type Fleet = { id: string; name: string; deviceIds: string[] };

export const fleets: Fleet[] = [
  {
    id: "maplewood",
    name: fleet.name,
    deviceIds: devices.map((d) => d.id),
  },
  { id: "cedar-house", name: "Cedar House", deviceIds: [] },
];

export function deviceName(id: string): string {
  return devices.find((d) => d.id === id)?.name ?? id;
}
