import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { LoginUserForm } from "@/types/user/user.type";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onSubmit: (data: LoginUserForm) => void;
  loading: boolean;
}

export default function LoginForm({ onSubmit,loading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 text-grayscale-900"
    >
      <Input
        id="email"
        className="w-full"
        icon={<Mail />}
        label="Correo"
        placeholder="Ingresar correo"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email no válido",
          },
        })}
        error={errors.email?.message}
      />

      <InputPassword
        id="password"
        {...register("password", {
          required: "La contraseña es obligatoria",
        })}
        error={errors.password?.message}
      />
      <a
        href="/forgot-password"
        type="button"
        className="self-end text-grayscale-700 duration-200 hover:text-primary-500-main"
      >
        ¿Olvidó su contraseña?
      </a>
      <Button
        className="text-xl w-full py-3 sm:w-full"
        type="submit"
        intent="primary"
        loading={loading}
      >
        Ingresar
      </Button>
    </form>
  );
}
