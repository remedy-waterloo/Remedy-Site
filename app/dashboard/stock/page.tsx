import { Package } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function StockPage() {
  return (
    <ComingSoon
      icon={Package}
      title="Stock"
      description="Medication inventory across your devices."
      planned={[
        "Remaining stock per device and medication",
        "Days-until-empty projections",
        "Low-stock alerts and refill tracking",
      ]}
    />
  );
}
