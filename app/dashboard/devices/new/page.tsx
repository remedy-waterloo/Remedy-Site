import type { Metadata } from "next";

import AddDeviceWizard from "@/app/components/dashboard/AddDeviceWizard";
import { fleets } from "@/app/lib/mock-dashboard";

export const metadata: Metadata = {
  title: "Add a device — Remedy",
};

export default function NewDevicePage() {
  return <AddDeviceWizard fleets={fleets} />;
}
