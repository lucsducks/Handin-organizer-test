import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { BadgeCheck, Building2, Plus, Trash2 } from "lucide-react";
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface UserProfileOrganizerFormCertificationsProps {
  formMethods: UseFormReturn<NewOrganizerForm>;
}

export const UserProfileOrganizerFormCertifications: React.FC<
  UserProfileOrganizerFormCertificationsProps
> = ({ formMethods: { register, control } }) => {
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div
      className={
        certificationFields.length === 0
          ? "space-y-4 rounded-lg border border-grayscale-400 p-4"
          : "space-y-4"
      }
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label
          className={
            certificationFields.length === 0
              ? "block text-grayscale-500"
              : "block text-lg font-medium text-grayscale-600"
          }
        >
          <BadgeCheck className="mr-2 inline-block size-4 lg:size-5" />
          <span>Certificaciones</span>
        </label>
        <Button
          className="w-full sm:w-fit"
          type="button"
          intent="secondary"
          size="sm"
          onClick={() =>
            appendCertification({
              name: "",
              institution: "",
              issueDate: "",
              expirationDate: "",
              credentialId: "",
              url: "",
            })
          }
        >
          <Plus className="size-4" />
          Añadir
        </Button>
      </div>
      {certificationFields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 rounded-lg border border-grayscale-400 p-4"
        >
          <div className="flex justify-end">
            <Button
              type="button"
              intent="icon"
              size="icon"
              onClick={() => removeCertification(index)}
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Nombre"
              icon={<BadgeCheck />}
              {...register(`certifications.${index}.name`, {
                required: true,
              })}
              placeholder="Nombre de la certificación"
            />
            <Input
              label="Institución"
              icon={<Building2 />}
              {...register(`certifications.${index}.institution`, {
                required: true,
              })}
              placeholder="Entidad certificadora"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Fecha de emisión"
              type="date"
              {...register(`certifications.${index}.issueDate`, {
                required: true,
              })}
            />
            <Input
              label="Fecha de expiración"
              type="date"
              {...register(`certifications.${index}.expirationDate`)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="ID de credencial"
              {...register(`certifications.${index}.credentialId`)}
              placeholder="Número o ID"
            />
            <Input
              label="URL de verificación"
              {...register(`certifications.${index}.url`)}
              placeholder="https://ejemplo.com/verificar"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
