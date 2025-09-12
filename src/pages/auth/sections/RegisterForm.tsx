import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { CreateUserForm, ResendCodeEmail } from "@/types/user/user.type";
import { UseMutateFunction } from "@tanstack/react-query";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { InputCode } from "../components/InputCode";

interface RegisterFormProps {
  onSubmit: (data: CreateUserForm) => void;
  resendEmailCode: UseMutateFunction<string, Error, ResendCodeEmail, unknown>;
  loading: boolean;
}

export function RegisterForm({ onSubmit, resendEmailCode, loading }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserForm>();

  const emailValue = watch("email");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-6"
    >
      <Input
        id="firstName"
        className="w-full"
        icon={<User />}
        label="Nombre"
        placeholder="Jhon"
        {...register("firstName", {
          required: "El Nombre es obligatorio",
        })}
        error={errors.firstName?.message}
      />
      <Input
        id="lastName"
        className="w-full"
        icon={<User />}
        label="Apellido"
        placeholder="Doe"
        {...register("lastName", {
          required: "El Apellido es obligatorio",
        })}
        error={errors.lastName?.message}
      />
      <Input
        id="email"
        className="w-full"
        icon={<Mail />}
        label="Correo"
        placeholder="usuario@example.com"
        type="email"
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo no válido",
          },
        })}
        error={errors.email?.message}
      />
      <InputPassword
        id="password"
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
          validate: (value) => {
            if (!/[A-Z]/.test(value)) {
              return "La contraseña debe contener al menos una mayúscula";
            }
            if (!/[a-z]/.test(value)) {
              return "La contraseña debe contener al menos una minúscula";
            }
            if (!/[0-9]/.test(value)) {
              return "La contraseña debe contener al menos un número";
            }

            return true;
          },
        })}
        error={errors.password?.message}
      />
      <InputCode
        id="code"
        {...register("code", {
          required: "El código es obligatorio",
        })}
        email={emailValue}
        resendEmailCode={resendEmailCode}
        error={errors.code?.message}
      />
      <Button className="w-full" type="submit" intent="primary" loading={loading}>
        Registrar
      </Button>
    </form>
  );
}
