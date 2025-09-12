import { useAuthStore } from "@/context/auth.context";
import { Role } from "@/enums/role.enum";
import { cn } from "@/lib/utils";
import { useOrganizerStore } from "@/store/organizer.store";
import { FolderOpen, Mic, MonitorPlay, User, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  toggleSidebar: () => void;
}

export function DashboardSidebar({
  isOpen,
  onClose,
  toggleSidebar,
}: DashboardSidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const { organizer } = useOrganizerStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const menuItems = useMemo(() => {
    const defaultMenu = [
      {
        icon: User,
        label: "Mi Perfil",
        path: "/dashboard/profile",
      },
    ];

    if (!user?.user?.roles || user.user?.roles.length === 0) {
      return defaultMenu;
    }

    if (user.user?.roles.includes(Role.ADMIN)) {
      return [
        {
          icon: FolderOpen,
          label: "Categorías",
          path: "/dashboard/categories",
        },
        {
          icon: Video,
          label: "Grabaciones",
          path: "/dashboard/recordings-admin",
        },
        {
          icon: Mic,
          label: "Organizadores",
          path: "/dashboard/organizer-admin",
        },
        ...defaultMenu,
      ];
    }

    if (user.user?.roles.includes(Role.MODERATOR)) {
      return [
        {
          icon: Video,
          label: "Grabaciones",
          path: "/dashboard/recordings-admin",
        },
        {
          icon: Mic,
          label: "Organizadores",
          path: "/dashboard/organizer-admin",
        },
        ...defaultMenu,
      ];
    }

    if (
      user.user?.roles.includes(Role.ORGANIZER) &&
      organizer?.verified === true
    ) {
      return [
        {
          icon: Video,
          label: "Grabaciones",
          path: "/dashboard/recordings-organizer",
        },
        {
          icon: MonitorPlay,
          label: "Conferencias",
          path: "/dashboard/conference",
        },
        ...defaultMenu,
      ];
    }

    if (user.user?.roles.length === 1 && user.user?.roles.includes(Role.USER)) {
      return defaultMenu;
    }

    return defaultMenu;
  }, [user?.user.roles, organizer?.verified]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-64px)] w-64 border-r lg:top-20 lg:h-[calc(100vh-80px)]",
          "bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-2",
                  "transition-colors",
                  "hover:bg-primary-100 hover:text-primary-500-main",
                  location.pathname === item.path
                    ? "text-primary-500-main"
                    : "text-grayscale-600",
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-grayscale-800">
                  {user?.user.firstName || "Usuario"}
                </span>
                <span className="text-xs text-grayscale-600">
                  {user?.user.roles?.includes("Administrador")
                    ? "Administrador"
                    : user?.user.roles?.includes("Organizador")
                      ? "Organizador"
                      : "En verificación"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
