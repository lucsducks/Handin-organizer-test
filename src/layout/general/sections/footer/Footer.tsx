import Logo from "@/components/ui/Logo";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-500-main text-white">
      <section className="mx-auto w-[90%] py-8">
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2 flex flex-col items-center gap-4 xl:col-span-1 xl:items-start">
            <Logo className="h-6 fill-white xl:h-8" />
            <div className="flex flex-row gap-8">
              <a target="_blank" href="https://www.facebook.com/handin.pro/">
                <Facebook size={24} />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/handin.pro"
              >
                <Instagram size={24} />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/handin.pro"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider">
              Compañía
            </h3>
            <ul className="mt-4 block space-y-4">
              {["Quiénes somos", "Misión", "Visión"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base font-medium transition-opacity hover:opacity-80"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://legal.handin.pro/legal/privacy"
                  className="text-base font-medium transition-opacity hover:opacity-80"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://legal.handin.pro/legal/terms"
                  className="text-base font-medium transition-opacity hover:opacity-80"
                >
                  Términos de servicio
                </a>
              </li>
              {["Política de cookies", "Propiedad intelectual"].map((item) => (
                <li key={item}>
                  <a
                    href="https://legal.handin.pro"
                    className="text-base font-medium transition-opacity hover:opacity-80"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-white md:my-8" />
        <div>
          <p className="text-center text-sm md:text-base">
            &copy; {new Date().getFullYear()} Handin. Todos los derechos
            reservados.
          </p>
        </div>
      </section>
    </footer>
  );
}
