"use client";

import { useSidebarStore } from "@/context/useSidebarStore";
import { Menu, X } from "lucide-react";

const ToggleSidebarButton = () => {
  const { isOpen, setClose, setOpen } = useSidebarStore();

  return (
    <button
      className="block rounded-full p-2 duration-200 hover:bg-primary-100 xl:hidden"
      onClick={isOpen ? setClose : setOpen}
    >
      {isOpen ? (
        <X className="size-5 stroke-primary-500-main" />
      ) : (
        <Menu className="size-5 stroke-primary-500-main" />
      )}
    </button>
  );
};

export default ToggleSidebarButton;
