import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-primary text-9xl font-extrabold tracking-widest text-grayscale-800">
            404
          </h1>
          <span className="text-2xl font-semibold text-grayscale-800 md:text-3xl">
            ¡Página no encontrada!
          </span>
          <p className="text-base text-grayscale-600">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4" />
            Volver atrás
          </Button>
          <Button className="gap-2" onClick={() => navigate("/dashboard")}>
            <HomeIcon className="h-4 w-4" />
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
