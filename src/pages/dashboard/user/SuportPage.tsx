import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/context/auth.context";
import {
  Bug,
  HelpCircle,
  LifeBuoy,
  Lightbulb,
  LucideIcon,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface SupportType {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface SupportType {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  priority: "Alta" | "Media" | "Baja";
}

const supportTypes: SupportType[] = [
  {
    id: "problem",
    label: "Problema técnico",
    description: "Reporta problemas o errores que hayas encontrado",
    icon: Bug,
    priority: "Alta",
  },
  {
    id: "question",
    label: "Consulta general",
    description: "Pregúntanos cualquier duda sobre la plataforma",
    icon: HelpCircle,
    priority: "Media",
  },
  {
    id: "suggestion",
    label: "Sugerencia",
    description: "Comparte tus ideas para mejorar la plataforma",
    icon: Lightbulb,
    priority: "Baja",
  },
  {
    id: "other",
    label: "Otros",
    description: "Otros tipos de consultas",
    icon: MessageCircle,
    priority: "Media",
  },
];

interface SupportModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedType: string | null;
}

const SupportModal = ({
  isOpen,
  setIsOpen,
  selectedType,
}: SupportModalProps) => {
  const [message, setMessage] = useState("");
  const user = useAuthStore((state) => state.user);

  const handleSubmit = () => {
    const supportType = supportTypes.find((type) => type.id === selectedType);

    const peruTime = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedMessage = encodeURIComponent(
      `*Nueva consulta de soporte*\n` +
        `---------------------------\n` +
        `*Tipo:* ${supportType?.label}\n` +
        `*Usuario:* ${user?.user?.firstName} ${user?.user?.lastName}\n` +
        `*Email:* ${user?.user?.email}\n` +
        `*Prioridad:* ${supportType?.priority}\n` +
        `*Fecha y hora:* ${peruTime}\n` +
        `---------------------------\n` +
        `*Mensaje:*\n${message}\n` +
        `---------------------------`,
    );

    window.open(`https://wa.me/934399132?text=${formattedMessage}`, "_blank");

    setMessage("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva consulta de soporte</DialogTitle>
          <DialogDescription>
            Cuéntanos en detalle cómo podemos ayudarte
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Describe tu consulta aquí..."
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!message.trim()}>
            Enviar por WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SupportPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTypeSelect = (type: any) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <LifeBuoy className="size-16 text-grayscale-800" />
        <div>
          <h1 className="text-3xl font-semibold text-grayscale-800">
            Centro de Soporte
          </h1>
          <p className="mt-1 text-grayscale-600">¿Cómo podemos ayudarte hoy?</p>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-2">
        {supportTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer transition-colors hover:border-primary-500-main"
            onClick={() => handleTypeSelect(type.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <type.icon className="size-5 text-grayscale-800" />
                <CardTitle className="text-lg">{type.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{type.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <SupportModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedType={selectedType}
      />
    </div>
  );
};

export default SupportPage;
