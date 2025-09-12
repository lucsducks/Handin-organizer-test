import curso from "@/assets/ilustrations/record-video-ilustration.webp";
import {
  DollarSign,
  LucideIcon,
  Megaphone,
  Pencil,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

const tabs = {
  "Regístrate como organizador": {
    title: "Regístrate como organizador",
    icon: UserIcon,
    content: (
      <>
        <p>
          Crea una cuenta gratuita y solicita acceso como organizador desde tu
          perfil. Una vez aprobado, accederás a un panel de gestión donde podrás
          crear eventos en vivo o cargar grabaciones ya existentes.
        </p>
        <ul className="flex list-disc flex-col gap-3 pl-6">
          <li>No necesitas conocimientos técnicos.</li>
          <li>Puedes empezar sin tener un evento ya listo.</li>
          <li>
            Desde el inicio puedes gestionar ambos formatos: en vivo o grabado.
          </li>
        </ul>
      </>
    ),
  },
  "Crea tu evento o grabación": {
    title: "Crea tu evento o grabación",
    icon: Pencil,
    content: (
      <>
        <p>
          ¿Tienes una conferencia próxima? Crea un evento en vivo y define el
          formato: presencial, virtual o híbrido. ¿Ya tienes contenido grabado?
          Súbelo y genera ingresos extra.
        </p>
        <ul className="flex list-disc flex-col gap-3 pl-6">
          <li>Establece fechas, categorías y precios.</li>
          <li>Sube miniaturas, descripciones y materiales complementarios.</li>
          <li>
            Todo el contenido grabado queda disponible para futuras ventas.
          </li>
        </ul>
      </>
    ),
  },
  "Personaliza y publica": {
    title: "Personaliza y publica",
    icon: Megaphone,
    content: (
      <>
        <p>
          Diseña la página de tu evento o grabación con tu estilo. Agrega
          imágenes, agenda, descripción del ponente y enlaces personalizados.
          Luego, ¡lánzalo con un solo clic!
        </p>
        <ul className="flex list-disc flex-col gap-3 pl-6">
          <li>Comparte tu evento por redes sociales.</li>
          <li>Handin te permite llegar a más público.</li>
          <li>
            Puedes ocultar contenido y publicarlo solo cuando estés listo.
          </li>
        </ul>
      </>
    ),
  },
  "Monetiza y gestiona automáticamente": {
    title: "Monetiza y gestiona automáticamente",
    icon: DollarSign,
    content: (
      <>
        <p>
          Empieza a recibir pagos de tickets y visualizaciones. Handin gestiona
          automáticamente certificados, estadísticas de asistencia y accesos.
        </p>
        <ul className="flex list-disc flex-col gap-3 pl-6">
          <li>Reportes en tiempo real de ingresos y participantes.</li>
          <li>Entrega automática de certificados.</li>
          <li>Monetización sin límites, incluso después del evento.</li>
        </ul>
      </>
    ),
  },
};

const TabButton = ({
  label,
  isActive,
  onClick,
  icon: Icon,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: LucideIcon;
}) => (
  <button
    className={`flex items-center gap-2 border-b-2 p-2 text-start duration-200 ${
      isActive
        ? "pointer-events-none border-transparent text-primary-500-main"
        : "border-transparent text-grayscale-600 hover:border-primary-500-main hover:text-primary-500-main"
    }`}
    onClick={onClick}
  >
    {Icon && (
      <div
        className={`flex size-8 items-center justify-center rounded-lg ${isActive ? "bg-primary-100" : "bg-grayscale-100"}`}
      >
        <Icon className="size-4" />
      </div>
    )}
    <span className="font-medium">{label}</span>
  </button>
);

export default function HowStart({ id }: { id: string }) {
  type TabKey = keyof typeof tabs;
  const [activeTab, setActiveTab] = useState<TabKey>(
    "Regístrate como organizador",
  );

  let Icon = tabs[activeTab].icon;

  return (
    <article
      id={id}
      className="mx-auto flex w-[90%] flex-col gap-8 pb-6 pt-12 sm:pb-8 sm:pt-16"
    >
      <h1 className="text-center text-2xl font-semibold text-grayscale-800 sm:text-5xl">
        ¿Cómo empezar a publicar en Handin?
      </h1>
      <p className="text-center text-grayscale-600 md:text-lg">
        Ya sea una conferencia en vivo o una grabación bajo demanda, en Handin
        puedes publicar contenido en minutos y empezar a generar ingresos.
      </p>
      <section className="flex flex-col items-center gap-4">
        <div className="w-full md:hidden">
          <select
            className="h-10 w-full rounded-lg border border-grayscale-300 px-4 font-medium text-grayscale-800 outline-none"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as TabKey)}
          >
            {Object.keys(tabs).map((tab) => (
              <option key={tab}>{tab}</option>
            ))}
          </select>
        </div>

        <div className="hidden w-full border-b border-grayscale-300 md:block">
          <nav className="grid w-full grid-cols-4 gap-4" aria-label="Tabs">
            {Object.entries(tabs).map(([label, tabData]) => (
              <TabButton
                key={label}
                label={label}
                icon={tabData.icon}
                isActive={activeTab === label}
                onClick={() => setActiveTab(label as TabKey)}
              />
            ))}
          </nav>
        </div>
        <div className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex w-fit justify-center rounded-lg bg-primary-100 p-16">
              <img
                src={curso}
                alt="Ilustración del curso"
                className="object-contain sm:max-w-[320px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 text-left md:text-lg">
            <div className="flex size-14 items-center justify-center rounded-lg bg-primary-100">
              <Icon className="size-8 text-primary-500-main" />
            </div>
            <h2 className="text-4xl font-semibold text-grayscale-700">
              {tabs[activeTab].title}
            </h2>
            <div className="space-y-4 text-grayscale-600">
              {tabs[activeTab].content}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
