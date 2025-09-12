import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/context/auth.context";
import UserPhoto from "@/pages/dashboard/user/components/UserPhoto";
import { HelpCircle, LogOut, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-grayscale-300 bg-white lg:h-20">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button onClick={toggleSidebar} intent="icon" size="icon">
            <Menu />
          </Button>
          <Logo className="h-6 fill-primary-500-main xl:h-8" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            intent="icon"
            size="icon"
            onClick={() => navigate("/dashboard/support")}
          >
            <HelpCircle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <UserPhoto user={user} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none text-grayscale-900">
                    {user?.user?.firstName ?? "N"} {user?.user?.lastName ?? "N"}
                  </p>
                  <p className="text-xs leading-none text-grayscale-600">
                    {user?.user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/profile")}
              >
                <User className="size-4" />
                <span>Perfil</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-error hover:bg-red-600/10 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
