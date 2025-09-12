import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.email))}
      className="flex flex-col items-center justify-center gap-4"
    >
      <Input
        id="email"
        icon={<Mail />}
        className="w-full"
        label="Correo"
        placeholder="usuario@example.com"
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$/i,
            message: "Correo no válido",
          },
        })}
        error={errors.email?.message}
      />
      <Button className="w-full" type="submit">
        Enviar
      </Button>
    </form>
  );
}
