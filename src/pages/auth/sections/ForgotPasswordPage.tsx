import { ForgotPasswordEmail } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { mutate: forgotPasswordMutation } = useMutation({
    mutationFn: (email: string) => ForgotPasswordEmail({ email }),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Se ha enviado un enlace de recuperación a tu correo");
      navigate("/login");
    },
  });

  const handleForgotPassword = (email: string) => {
    forgotPasswordMutation(email);
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold text-grayscale-800 md:text-5xl">
        Recupera tu contraseña
      </h1>
      <p className="text-center text-base text-grayscale-600">
        Enviaremos un correo electrónico con un enlace para restablecer tu
        contraseña.
      </p>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
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
