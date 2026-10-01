import { History } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function DispenseHistoryPage() {
  return (
    <ComingSoon
      icon={History}
      title="Dispense History"
      description="A log of every dose each device has dispensed."
      planned={[
        "Timestamped log of every dispense event",
        "Filter by patient, device, medication, or date",
        "Taken, missed, and late dose outcomes",
      ]}
    />
  );
}
