import { Mail } from "lucide-react";
import ComingSoon from "@/components/comingSoon";

export default function ContactsPage() {
  return (
    <ComingSoon
      title="Contactos"
      description="Página de contactos em desenvolvimento. Entretanto, fale connosco através de contacto@coachflow.com."
      icon={<Mail size={28} />}
      backHref="/"
      backLabel="Voltar ao início"
    />
  );
}
