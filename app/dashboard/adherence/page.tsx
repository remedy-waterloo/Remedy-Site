import { HeartPulse } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function AdherencePage() {
  return (
    <ComingSoon
      icon={HeartPulse}
      title="Patient Adherence"
      description="How consistently each patient is taking their medication."
      planned={[
        "Adherence rate per patient, ward, and fleet",
        "Missed and late dose trends over time",
        "Flags for patients falling below target",
      ]}
    />
  );
}
