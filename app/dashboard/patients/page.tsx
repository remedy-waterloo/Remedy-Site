import { Users } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function PatientsPage() {
  return (
    <ComingSoon
      icon={Users}
      title="Patients"
      description="Everyone receiving medication from a Remedy device."
      planned={[
        "Patient profiles with active prescriptions",
        "Assigned device and dose schedule",
        "Per-patient dispense and adherence history",
      ]}
    />
  );
}
