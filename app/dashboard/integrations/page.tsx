import { Plug } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function IntegrationsPage() {
  return (
    <ComingSoon
      icon={Plug}
      title="Integrations"
      description="Sync Remedy with your MAR system."
      planned={[
        "PointClickCare (PCC) MAR direct integration",
        "Yardi MAR direct integration",
        "CaraSolva MAR direct integration",
      ]}
    />
  );
}
