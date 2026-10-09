import { CreditCard } from "lucide-react";
import ComingSoon from "@/components/comingSoon";

export default function PaymentsPage() {
  return (
    <ComingSoon
      title="Pagamentos"
      description="Registe pagamentos, identifique valores pendentes e consulte o resumo financeiro."
      icon={<CreditCard size={28} />}
    />
  );
}
