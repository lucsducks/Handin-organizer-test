import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import {
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface UserProfileOrganizerFormExperienceProps {
  formMethods: UseFormReturn<NewOrganizerForm>;
}

export const UserProfileOrganizerFormExperience: React.FC<
  UserProfileOrganizerFormExperienceProps
> = ({
  formMethods: {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  },
}) => {
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div
      className={
        experienceFields.length === 0
          ? "space-y-4 rounded-lg border border-grayscale-400 p-4"
          : "space-y-4"
      }
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label
          className={
            experienceFields.length === 0
              ? "block text-grayscale-500"
              : "block text-lg font-medium text-grayscale-600"
          }
        >
          <Briefcase className="mr-2 inline-block size-4 lg:size-5" />
          <span>Experiencia Laboral</span>
        </label>
        <Button
          className="w-full sm:w-fit"
          type="button"
          intent="secondary"
          size="sm"
          onClick={() =>
            appendExperience({
              company: "",
              position: "",
              description: "",
              startDate: "",
              endDate: "",
              current: false,
            })
          }
        >
          <Plus className="size-4" />
          Añadir
        </Button>
      </div>
      {experienceFields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded-lg border border-grayscale-400 p-4"
        >
          <div className="grid grid-cols-2">
            <label
              htmlFor={`experience.${index}.current`}
              className="group relative flex w-fit cursor-pointer items-center duration-200"
            >
              <Input
                type="checkbox"
                id={`experience.${index}.current`}
                className="hidden"
                {...register(`experience.${index}.current`, {
                  onChange: (e) => {
                    if (e.target.checked) {
                      setValue(`experience.${index}.endDate`, "");
                    }
                  },
                })}
              />
              <div className="pointer-events-none flex size-5 items-center justify-center overflow-hidden rounded-[4px] border border-grayscale-500 bg-white p-1 duration-200 group-hover:border-primary-500-main group-has-[input:checked]:border-primary-500-main group-has-[input:checked]:bg-primary-500-main">
                <span className="text-white duration-200">
                  <Check size={16} />
                </span>
              </div>
              <span className="ml-2 text-base font-normal text-grayscale-800 duration-200 group-hover:text-primary-500-main">
                Trabajo actual
              </span>
            </label>
            <div className="flex justify-end">
              <Button
                type="button"
                intent="icon"
                size="icon"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              icon={<Building2 />}
              label="Empresa"
              error={errors.experience?.[index]?.company?.message}
              {...register(`experience.${index}.company`, {
                required: "La empresa es requerida",
              })}
              placeholder="Nombre de la empresa"
            />
            <Input
              icon={<BriefcaseBusiness />}
              label="Cargo"
              error={errors.experience?.[index]?.position?.message}
              {...register(`experience.${index}.position`, {
                required: "El cargo es requerido",
              })}
              placeholder="Cargo ocupado"
            />
          </div>
          <Textarea
            label="Descripción"
            {...register(`experience.${index}.description`)}
            placeholder="Describe tus responsabilidades"
            rows={2}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Fecha de inicio"
              error={errors.experience?.[index]?.startDate?.message}
              type="date"
              {...register(`experience.${index}.startDate`, {
                required: "La fecha de inicio es requerida",
              })}
            />
            <Input
              label="Fecha de termino"
              error={errors.experience?.[index]?.endDate?.message}
              type="date"
              {...register(`experience.${index}.endDate`)}
              disabled={watch(`experience.${index}.current`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
