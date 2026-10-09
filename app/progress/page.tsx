import { TrendingUp } from "lucide-react";
import ComingSoon from "@/components/comingSoon";

export default function ProgressPage() {
  return (
    <ComingSoon
      title="Desempenho"
      description="Acompanhe a evolução dos seus clientes com gráficos e histórico de resultados."
      icon={<TrendingUp size={28} />}
    />
  );
}
