import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { Award, Book, List } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface UserProfileOrganizerFormBasicFieldsProps {
  formMethods: UseFormReturn<NewOrganizerForm>;
}

export const UserProfileOrganizerFormBasicFields: React.FC<
  UserProfileOrganizerFormBasicFieldsProps
> = ({
  formMethods: {
    register,
    formState: { errors },
  },
}) => {
  //TODO: Change inputs according to organizer profile needs
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-grayscale-600">
        <List className="mr-2 inline-block size-4 lg:size-5" />
        <span>Información general</span>
      </label>
      <Input
        {...register("degree", { required: "Este campo es requerido" })}
        type="text"
        icon={<Book />}
        label="Razón Social"
        placeholder="Ej. Handin S.A."
        error={errors.degree?.message}
        isRequired
      />
      <Input
        {...register("specialty", {
          required: "Este campo es requerido",
        })}
        type="text"
        icon={<Award />}
        label="RUC"
        placeholder="Ej: 12345678901"
        error={errors.specialty?.message}
        isRequired
      />
      <Textarea
        {...register("biography", {
          required: "Este campo es requerido",
          minLength: {
            value: 50,
            message: "La biografía debe tener al menos 50 caracteres",
          },
          maxLength: {
            value: 1000,
            message: "La biografía no puede exceder los 1000 caracteres",
          },
        })}
        rows={4}
        placeholder="Descripción (max 1000 caracteres)"
        label="Descripción"
        error={errors.biography?.message}
        isRequired
      />
      {/* <Input
        label="Habilidades"
        icon={<ListChecks />}
        {...register("skills", {
          required: "Las habilidades son requeridas",
          setValueAs: (value) => {
            if (typeof value === "string") {
              return value
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== "");
            }
            return value;
          },
        })}
        error={errors.skills?.message}
        placeholder="Habilidades (separadas por comas)"
        isRequired
      /> */}
    </div>
  );
};
