import { registerUser, resendEmailCode } from "@/api/auth.api";
import { useAuthStore } from "@/context/auth.context";
import { UserAuth } from "@/models/user/user.model";
import { CreateUserForm, ResendCodeEmail } from "@/types/user/user.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { RegisterForm } from "./sections/RegisterForm";

export function RegisterPage() {
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate,isPending } = useMutation({
    mutationFn: registerUser,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: UserAuth) => {
      setUser(data);

      toast.success(
        `¡Hola ${
          data.user.firstName + " " + data.user.lastName
        }, cuentra creada con exito 🎉`,
      );
    },
  });
  const { mutate: resendCodeMutation } = useMutation({
    mutationFn: (data: ResendCodeEmail) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!data.email || !emailRegex.test(data.email)) {
        toast.error("El correo electrónico no es válido");
      }

      return resendEmailCode(data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Código de verificación enviado");
    },
  });

  const handleRegister = (formData: CreateUserForm) => {
    mutate(formData);
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold text-grayscale-800 md:text-5xl">
        Enseña en Handin
      </h1>
      <RegisterForm
        onSubmit={handleRegister}
        resendEmailCode={resendCodeMutation}
        loading={isPending}
      />
      <div className="flex items-center justify-center gap-2">
        <p className="text-grayscale-700">¿Ya tienes una cuenta?</p>
        <a
          className="font-medium text-grayscale-700 duration-200 hover:text-primary-500-main"
          href={"/login"}
        >
          Ingresar
        </a>
      </div>
    </div>
  );
}
