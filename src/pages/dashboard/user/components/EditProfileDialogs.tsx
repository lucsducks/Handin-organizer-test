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
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/context/auth.context";
import { User } from "@/models/user/user.model";
import type { UpdateUserForm } from "@/types/user/user.type";
import { Pencil, Save, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditProfileDialogProps {
  user: User;
}

const EditProfileDialog = ({ user }: EditProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (value: string) => {
    if (!value) return "El teléfono es requerido";

    const cleanNumber = value.replace(/\D/g, "");

    const phoneRegex = /^9\d{8}$/;

    if (!phoneRegex.test(cleanNumber)) {
      return "Ingrese un número de teléfono válido (9 dígitos comenzando con 9)";
    }

    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
    },
  });

  const { updateUser } = useAuthStore();

  const onSubmit = async (data: UpdateUserForm) => {
    try {
      setIsSubmitting(true);
      const formattedData = {
        ...data,
        phone: data.phone.replace(/\D/g, ""),
      };
      await updateUser(formattedData);

      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Error al actualizar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu información personal aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Nombre"
              icon={<User2 />}
              id="firstName"
              {...register("firstName", {
                required: "El nombre es requerido",
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Apellido"
              id="lastName"
              {...register("lastName", {
                required: "El apellido es requerido",
              })}
              error={errors.lastName?.message}
            />
            <Input
              label="Teléfono"
              id="phone"
              placeholder="999999999"
              {...register("phone", {
                validate: validatePhone,
              })}
              error={errors.phone?.message}
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

export default EditProfileDialog;
