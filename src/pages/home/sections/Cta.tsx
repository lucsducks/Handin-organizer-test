import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Cta({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <article
      id={id}
      className="mx-auto flex w-[90%] flex-col items-center gap-8 pb-6 pt-12 sm:pb-8 sm:pt-16"
    >
      <h1 className="text-center text-2xl font-semibold text-primary-500-main sm:text-5xl">
        Conviértete en organizador Handin ahora
      </h1>
      <p className="text-center leading-relaxed text-grayscale-600 md:text-lg">
        Únete a una de las tiendas virtuales de conferencias líderes en el Perú
        y comparte tu conocimiento con miles de usuarios
      </p>
      <Button onClick={() => navigate("/login")}>Empezar ahora</Button>
      <div className="grid grid-cols-2 gap-8 text-center text-grayscale-700 md:grid-cols-3">
        <div className="flex flex-col">
          <span className="text-2xl font-bold md:text-3xl">1000+</span>
          <span>Organizadores activos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold md:text-3xl">50K+</span>
          <span>Usuarios</span>
        </div>
        <div className="col-span-2 flex flex-col md:col-span-1">
          <span className="text-2xl font-bold md:text-3xl">95%</span>
          <span>Satisfacción</span>
        </div>
      </div>
    </article>
  );
}
