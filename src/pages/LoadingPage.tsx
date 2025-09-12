import Logo from "@/components/ui/Logo";
import Spinner from "@/components/ui/Spinner";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col items-center space-y-8 rounded-2xl p-12 shadow backdrop-blur-md">
        <Logo className="h-6 fill-primary-500-main xl:h-8" />
        <Spinner className="size-16 text-primary-500-main" />
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-grayscale-800">Cargando</h2>
          <p className="text-center text-sm text-grayscale-600">
            Estamos preparando todo para ti...
          </p>
        </div>

        <p className="mt-4 text-xs text-grayscale-600">
          Esto solo tomará unos segundos
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
