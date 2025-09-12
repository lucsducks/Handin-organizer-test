import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { GraduationCap, Microscope, Plus, School, Trash2 } from "lucide-react";
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface UserProfileOrganizerFormEducationProps {
  formMethods: UseFormReturn<NewOrganizerForm>;
}

export const UserProfileOrganizerFormEducation: React.FC<
  UserProfileOrganizerFormEducationProps
> = ({ formMethods: { register, control } }) => {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div
      className={
        educationFields.length === 0
          ? "space-y-4 rounded-lg border border-grayscale-400 p-4"
          : "space-y-4"
      }
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label
          className={
            educationFields.length === 0
              ? "block text-grayscale-500"
              : "block text-lg font-medium text-grayscale-600"
          }
        >
          <School className="mr-2 inline-block size-4 lg:size-5" />
          <span>Educación</span>
        </label>
        <Button
          className="w-full sm:w-fit"
          type="button"
          intent="secondary"
          size="sm"
          onClick={() =>
            appendEducation({
              institution: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          <Plus className="size-4" />
          Añadir
        </Button>
      </div>
      {educationFields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded-lg border border-grayscale-400 p-4"
        >
          <div className="flex justify-end">
            <Button
              type="button"
              intent="icon"
              size="icon"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Institución"
              icon={<School />}
              {...register(`education.${index}.institution`, {
                required: true,
              })}
              placeholder="Nombre de la institución"
            />
            <Input
              label="Grado"
              icon={<GraduationCap />}
              {...register(`education.${index}.degree`, {
                required: true,
              })}
              placeholder="Título obtenido"
            />
          </div>
          <Input
            label="Campo de estudio"
            icon={<Microscope />}
            {...register(`education.${index}.field`)}
            placeholder="Especialidad o área"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Fecha de inicio"
              type="date"
              {...register(`education.${index}.startDate`, {
                required: true,
              })}
            />
            <Input
              label="Fecha de termino"
              type="date"
              {...register(`education.${index}.endDate`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
