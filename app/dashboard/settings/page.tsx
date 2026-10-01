import { Settings } from "lucide-react";

import ComingSoon from "@/app/components/dashboard/ComingSoon";

export default function SettingsPage() {
  return (
    <ComingSoon
      icon={Settings}
      title="Settings"
      description="Account and organization preferences."
      planned={[
        "Profile and password",
        "Team members and permissions",
        "Notification preferences",
      ]}
    />
  );
}
