import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/context/auth.context";
import { UpdatePictureFields } from "@/types/user/user.type";
import { Camera, RefreshCcw, Save, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import UserPhoto from "./UserPhoto";

const UpdateProfileForm: React.FC = () => {
  const { user, updateProfilePicture, isLoading } = useAuthStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "El formato del archivo no es válido. Solo se permiten JPEG, JPG y PNG.",
        );
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "El archivo es demasiado grande. El tamaño máximo permitido es 2MB.",
        );
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    handleClear();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;

    try {
      const dataToUpdate: UpdatePictureFields = {
        photo: selectedFile,
      };

      await updateProfilePicture(dataToUpdate);

      handleClear();
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(
        (error as Error).message || "Error al actualizar la foto de perfil",
      );
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 right-0 top-0 -z-10 h-36 bg-primary-500-main" />
        <div className="relative z-0 mt-8 self-center rounded-full border border-primary-100 bg-white p-2 shadow">
          <UserPhoto
            user={user}
            className="size-36 md:size-48"
            classNameText="text-3xl md:text-6xl"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 flex size-10 items-center justify-center rounded-full border-white bg-primary-500-main text-white shadow duration-200 hover:bg-primary-600 lg:size-12"
            onClick={() => setIsDialogOpen(true)}
          >
            <Camera className="size-5" />
          </button>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Actualizar foto de perfil</DialogTitle>
            <DialogDescription>
              Selecciona una nueva imagen para tu perfil
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div className="relative self-center rounded-full border border-primary-100 bg-white p-2 shadow">
              <UserPhoto
                user={user}
                className="size-40"
                classNameText="text-3xl"
                previewUrl={previewUrl}
              />

              <button
                type="button"
                className="absolute bottom-0 right-0 flex size-12 items-center justify-center rounded-full border-white bg-primary-500-main text-white shadow duration-200 hover:bg-primary-600"
                onClick={() => fileInputRef.current?.click()}
              >
                <RefreshCcw size={20} />
              </button>
              {previewUrl && (
                <button
                  type="button"
                  className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-red-600 p-2 text-white"
                  onClick={handleClear}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-6 w-full">
              <input
                type="file"
                id="photo"
                name="photo"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/jpg,image/png"
                disabled={isLoading}
                onChange={handleFileChange}
              />

              <p className="mb-4 text-center text-xs text-gray-500">
                Formatos permitidos: JPEG, JPG, PNG. Máximo 2MB
              </p>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleCloseDialog}
                  disabled={isLoading}
                  intent="secondary"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={!previewUrl || isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileForm;
