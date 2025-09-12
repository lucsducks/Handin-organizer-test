"use client";

import Overlay from "@/components/ui/Overlay";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/context/useSidebarStore";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SideBar = () => {
  const { isOpen, setClose } = useSidebarStore();
  const navigate = useNavigate();

  const navItems = [
    { link: "Inicio", path: "hero" },
    { link: "Misión", path: "mission" },
    { link: "Visión", path: "vision" },
    { link: "FAQ", path: "faq" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isOpen) {
        setClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setClose]);

  const scrollToSection = useScrollSmooth();

  return (
    <>
      {isOpen && <Overlay onclick={setClose} className="z-30" />}
      <nav
        className={twMerge(
          "fixed bottom-0 right-0 top-16 z-40 flex w-72 flex-col justify-between overflow-y-auto bg-white p-4 transition-all duration-300 xl:hidden",
          isOpen ? "left-0" : "-left-72",
        )}
      >
        <ul className="flex flex-col gap-2">
          {navItems.map(({ link, path }) => (
            <button
              key={path}
              onClick={() => scrollToSection(path)}
              className="rounded-lg px-4 py-2 font-medium text-grayscale-600 duration-200 hover:bg-primary-100 hover:text-primary-500-main"
            >
              {link}
            </button>
          ))}
        </ul>
        <div className="space-y-2">
          <a href="http://localhost:3000">
            <Button className="w-full" intent="tertiary" size="sm">
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
            className="w-full"
            size="sm"
          >
            Registrarse
          </Button>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
