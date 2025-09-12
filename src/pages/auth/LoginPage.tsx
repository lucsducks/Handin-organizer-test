import { loginUser } from "@/api/auth.api";
import { useAuthStore } from "@/context/auth.context";
import { UserAuth } from "@/models/user/user.model";
import { LoginUserForm } from "@/types/user/user.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "./sections/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const initializeOrganizerId = useAuthStore(
    (state) => state.initializeOrganizerId,
  );
  const { mutate,isPending} = useMutation({
    mutationFn: loginUser,
    
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: UserAuth) => {
      setUser(data);
      handleLoginSuccess(data);
    },
  });
  const handleLoginSuccess = async (user: UserAuth) => {
    setUser(user);
    if (
      user.user.roles.includes("Organizador") &&
      !user.user.roles.includes("Administrador")
    ) {
      try {
        await initializeOrganizerId();
      } catch (error) {
        toast.error("Error al obtener el ID del profesor");
      }
    }

    toast.success(`¡Hola ${user.user.firstName}, Nos alegra verte de nuevo 🎉`);

    if (user.user.roles.includes("admin")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };
  const handleLogin = (formData: LoginUserForm) => {
    mutate(formData);
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold text-grayscale-800 md:text-5xl">
        Bienvenido a Handin Organizadores
      </h1>
      <LoginForm onSubmit={handleLogin} loading ={isPending}/>
      <div className="flex items-center justify-center gap-2">
        <p className="text-grayscale-700">¿No tienes una cuenta?</p>
        <a
          className="font-medium text-grayscale-700 duration-200 hover:text-primary-500-main"
          href={"/register"}
        >
          Registrarse
        </a>
      </div>
    </div>
  );
}
