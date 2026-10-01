import { Router } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function DevicesPage() {
  return (
    <ComingSoon
      icon={Router}
      title="Fleets & Devices"
      description="Organize your Remedy devices into fleets."
      planned={[
        "Create and manage fleets",
        "Add a device to a fleet and get a code to enter on the device",
        "Device health, connectivity, and firmware",
      ]}
    />
  );
}
