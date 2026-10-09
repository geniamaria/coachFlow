import { Target } from "lucide-react";
import ComingSoon from "@/components/comingSoon";

export default function GoalsPage() {
  return (
    <ComingSoon
      title="Metas"
      description="Defina objetivos individuais para cada cliente e acompanhe o progresso ao longo do tempo."
      icon={<Target size={28} />}
    />
  );
}
