import HeroImg from "@/assets/img/hero-image-organizers.png";
import { Button } from "@/components/ui/button";
import {
  HandCoins,
  Maximize,
  Megaphone,
  Mic,
  MousePointerClick,
  Pencil,
  Phone,
  ScreenShare,
  Video,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function Hero({ id }: { id: string }) {
  return (
    <article className="grid xl:grid-cols-2" id={id}>
      <section className="mx-auto flex w-[90%] flex-col items-center justify-center gap-8 py-8 sm:items-start xl:mx-0 xl:ml-auto xl:pr-4">
        <div className="flex w-fit flex-row items-center justify-center gap-2 rounded-full bg-primary-50 px-4 py-1 text-sm text-primary-500-main sm:text-base">
          <MousePointerClick className="size-6 stroke-[1px] sm:size-5" />
          <h2>Tus conferencias en minutos</h2>
        </div>
        <h1 className="text-center text-2xl font-semibold text-grayscale-800 sm:text-start sm:text-5xl/[72px] md:text-6xl/[72px]">
          Organiza eventos que impactan
        </h1>
        <p className="text-center text-base text-grayscale-600 sm:text-start sm:text-lg/10">
          Explora todo el potencial de Handin para crear, publicar y monetizar
          tus conferencias.
          <br /> Comparte tu experiencia con el mundo y genera ingresos desde
          una sola plataforma.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a href="/login">
            <Button>Unirse a Handin</Button>
          </a>
          <a href="#mission">
            <Button intent="secondary">Conocer Handin</Button>
          </a>
        </div>
      </section>
      <section className="rounded-l-none bg-primary-50 xl:rounded-l-full">
        <section className="mx-auto flex w-[90%] items-center justify-center py-16 xl:mx-0">
          <div className="relative flex flex-col items-center justify-center gap-2 px-0 pt-10 md:px-16">
            <div className="absolute right-[calc(50%+15px)] top-0 h-[320px] w-[200px] translate-x-1/2 rounded-full bg-gradient-to-b from-[#38B5E6] to-[#188FBE] sm:right-[calc(50%+20px)] sm:h-[440px] sm:w-[300px] sm:scale-100" />
            <div className="relative z-10 h-[350px] w-[315px] sm:h-[465px] sm:w-[420px]">
              <img
                src={HeroImg}
                alt="hombre-sonriente-conferencia"
                className="image-gradient object-cover"
              />
            </div>
            <div className="shadow-container flex flex-row gap-4 rounded-lg border border-primary-100 bg-white px-4 py-2 text-grayscale-600 sm:gap-5">
              <div className="flex size-10 items-center justify-center rounded-full bg-grayscale-100 text-grayscale-400 sm:size-12">
                <Maximize className="size-5 sm:size-6" />
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-500-main sm:size-12">
                <Mic className="size-5 sm:size-6" />
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-red-600 text-red-600 sm:size-12">
                <Phone className="size-5 rotate-[135deg] fill-white sm:size-6" />
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-primary-500-main sm:size-12">
                <Video className="size-5 sm:size-6" />
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-grayscale-100 text-grayscale-400 sm:size-12">
                <ScreenShare className="size-5 sm:size-6" />
              </div>
            </div>
            <HeroCard
              position="left-0 top-0 sm:-translate-x-1/3 xl:-translate-x-0 2xl:-translate-x-1/3 z-20"
              icon={<Pencil className="text-primary-500-main" />}
              title="Crea"
              description="Diseña experiencias presenciales, virtuales o híbridas en pocos pasos."
            />
            <HeroCard
              position="left-0 bottom-48 -translate-x-0 sm:-translate-x-1/2 xl:-translate-x-0 2xl:-translate-x-1/2 z-20"
              icon={<Megaphone className="text-primary-500-main" />}
              title="Publica"
              description="Lanza tu conferencia al instante y alcanza nuevas audiencias."
            />
            <HeroCard
              position="right-0 bottom-2/3 sm:bottom-1/2 sm:translate-x-1/2 xl:translate-x-0 2xl:translate-x-1/2 z-20"
              icon={<HandCoins className="text-primary-500-main" />}
              title="Monetiza"
              description="Vende entradas, monetiza grabaciones y genera ingresos."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="66"
              height="66"
              viewBox="0 0 66 66"
              className="absolute left-0 top-24 scale-75 fill-grayscale-400 sm:top-[calc(25%+12px)] sm:scale-100"
            >
              <rect width="6" height="6" rx="2" />
              <rect x="20" width="6" height="6" rx="2" />
              <rect x="40" width="6" height="6" rx="2" />
              <rect x="60" width="6" height="6" rx="2" />
              <rect y="20" width="6" height="6" rx="2" />
              <rect x="20" y="20" width="6" height="6" rx="2" />
              <rect x="40" y="20" width="6" height="6" rx="2" />
              <rect x="60" y="20" width="6" height="6" rx="2" />
              <rect y="40" width="6" height="6" rx="2" />
              <rect x="20" y="40" width="6" height="6" rx="2" />
              <rect x="40" y="40" width="6" height="6" rx="2" />
              <rect x="60" y="40" width="6" height="6" rx="2" />
              <rect y="60" width="6" height="6" rx="2" />
              <rect x="20" y="60" width="6" height="6" rx="2" />
              <rect x="40" y="60" width="6" height="6" rx="2" />
              <rect x="60" y="60" width="6" height="6" rx="2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="126"
              height="66"
              viewBox="0 0 126 66"
              className="absolute right-0 top-0 scale-75 fill-grayscale-400 sm:right-4 sm:top-4 sm:scale-100"
            >
              <rect width="6" height="6" rx="2" />
              <rect x="20" width="6" height="6" rx="2" />
              <rect x="40" width="6" height="6" rx="2" />
              <rect x="60" width="6" height="6" rx="2" />
              <rect y="20" width="6" height="6" rx="2" />
              <rect x="20" y="20" width="6" height="6" rx="2" />
              <rect x="40" y="20" width="6" height="6" rx="2" />
              <rect x="60" y="20" width="6" height="6" rx="2" />
              <rect y="40" width="6" height="6" rx="2" />
              <rect x="20" y="40" width="6" height="6" rx="2" />
              <rect x="40" y="40" width="6" height="6" rx="2" />
              <rect x="60" y="40" width="6" height="6" rx="2" />
              <rect y="60" width="6" height="6" rx="2" />
              <rect x="20" y="60" width="6" height="6" rx="2" />
              <rect x="40" y="60" width="6" height="6" rx="2" />
              <rect x="60" y="60" width="6" height="6" rx="2" />
              <rect x="80" width="6" height="6" rx="2" />
              <rect x="80" y="20" width="6" height="6" rx="2" />
              <rect x="80" y="40" width="6" height="6" rx="2" />
              <rect x="80" y="60" width="6" height="6" rx="2" />
              <rect x="100" width="6" height="6" rx="2" />
              <rect x="100" y="20" width="6" height="6" rx="2" />
              <rect x="100" y="40" width="6" height="6" rx="2" />
              <rect x="100" y="60" width="6" height="6" rx="2" />
              <rect x="120" width="6" height="6" rx="2" />
              <rect x="120" y="20" width="6" height="6" rx="2" />
              <rect x="120" y="40" width="6" height="6" rx="2" />
              <rect x="120" y="60" width="6" height="6" rx="2" />
            </svg>
          </div>
        </section>
      </section>
    </article>
  );
}

function HeroCard({
  position,
  icon,
  title,
  description,
}: {
  position: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className={twMerge(
        "shadow-container absolute flex w-fit flex-col gap-2 rounded-2xl border border-primary-100 bg-white p-3 sm:w-44",
        position,
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary-100 p-[6px]">
        {icon}
      </div>
      <div className="hidden space-y-2 sm:block">
        <h4 className="text-sm font-semibold text-grayscale-800">{title}</h4>
        <p className="text-xs/5 text-grayscale-600">{description}</p>
      </div>
    </div>
  );
}
