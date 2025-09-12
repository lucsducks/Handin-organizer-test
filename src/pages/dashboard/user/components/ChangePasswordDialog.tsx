import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputPassword } from "@/components/ui/input-password";
import { useAuthStore } from "@/context/auth.context";
import { ChangePasswordFields } from "@/types/user/user.type";
import { Lock, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePasswordDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (value: string) => {
    if (!value) return "La contraseña es requerida";

    if (value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
    if (!passwordRegex.test(value)) {
      return "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número";
    }

    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ChangePasswordFields>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { changePassword } = useAuthStore();

  const onSubmit = async (data: ChangePasswordFields) => {
    try {
      setIsSubmitting(true);
      await changePassword(data);
      toast.success("Contraseña actualizada con éxito");
      setIsOpen(false);
      reset();
    } catch (error) {
      toast.error(
        (error as Error).message || "Error al actualizar la contraseña",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button intent="secondary" size="sm">
          <Lock className="size-4" />
          Cambiar Contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cambiar Contraseña</DialogTitle>
          <DialogDescription>
            Actualiza tu contraseña aquí. Asegúrate de crear una contraseña
            segura.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputPassword
              id="currentPassword"
              label="Contraseña actual"
              {...register("currentPassword", {
                required: "La contraseña actual es obligatoria",
              })}
              error={errors.currentPassword?.message}
              placeholder="Ingresa tu contraseña actual"
            />
            <InputPassword
              id="newPassword"
              label="Nueva contraseña"
              {...register("newPassword", {
                validate: validatePassword,
              })}
              error={errors.newPassword?.message}
              placeholder="Ingresa tu nueva contraseña"
            />
            <InputPassword
              id="confirmPassword"
              label="Confirmar contraseña"
              error={errors.confirmPassword?.message}
              placeholder="Confirma tu nueva contraseña"
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Las contraseñas no coinciden",
              })}
            />
            {errors.root && (
              <div className="rounded-lg bg-destructive/10 p-4">
                <p className="text-sm text-destructive">
                  {errors.root.message}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              intent="secondary"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  Procesando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
