import { FileText } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function ReportsPage() {
  return (
    <ComingSoon
      icon={FileText}
      title="Reports"
      description="Generate adherence and dispensing reports."
      planned={[
        "Adherence and dispensing reports by date range",
        "Printable paper reports for charts and audits",
        "PDF and CSV export",
      ]}
    />
  );
}
