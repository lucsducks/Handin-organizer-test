import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import ToggleSidebarButton from "../../components/ToggleSidebarButton";

export function Header() {
  const navigate = useNavigate();

  const navItems = [
    { link: "Inicio", path: "hero" },
    { link: "Empezar", path: "how-start" },
    { link: "FAQ", path: "faq" },
  ];

  const scrollToSection = useScrollSmooth();

  return (
    <>
      <header className="shadow-header fixed left-0 right-0 z-50 h-16 bg-white">
        <section className="relative mx-auto flex h-full w-[90%] items-center justify-between gap-10">
          <ToggleSidebarButton />
          <a href="/">
            <Logo className="h-7 fill-primary-500-main duration-200 hover:fill-primary-600" />
          </a>
          <div className="hidden flex-row gap-8 xl:flex">
            <ul className="flex items-center gap-2">
              {navItems.map(({ link, path }) => (
                <Button
                  key={path}
                  onClick={() => scrollToSection(path)}
                  size="sm"
                  intent="tertiary"
                  className="text-grayscale-600 hover:text-primary-500-main"
                >
                  {link}
                </Button>
              ))}
            </ul>
            <div className="flex flex-row items-center gap-4">
              <a href="https://www.handin.pro">
                <Button className="w-full" size="sm" intent="tertiary">
                  Explorar
                </Button>
              </a>
              <Button
                onClick={() => navigate("/login")}
                className="w-full"
                size="sm"
                intent="secondary"
              >
                Ingresar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                size="sm"
                className="w-full"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </section>
      </header>
      <SideBar />
    </>
  );
}
