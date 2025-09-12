import { Input } from "@/components/ui/input";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { Globe } from "lucide-react";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface UserProfileOrganizerFormSocialMediaProps {
  formMethods: UseFormReturn<NewOrganizerForm>;
  isValidUrl: (url: string) => boolean;
  formatUrl: (url: string, defaultDomain: string) => string;
}

export const UserProfileOrganizerFormSocialMedia: React.FC<
  UserProfileOrganizerFormSocialMediaProps
> = ({
  formMethods: {
    register,
    setValue,
    watch,
    formState: { errors },
  },
  isValidUrl,
  formatUrl,
}) => {
  const DEFAULT_URL = "https://organizer.handin.pro";

  const socialMediaValues = watch("socialMedia");

  const handleBlur =
    (field: keyof typeof socialMediaValues, defaultDomain: string) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (!value) {
        setValue(`socialMedia.${field}`, DEFAULT_URL);
      } else if (!isValidUrl(value)) {
        setValue(`socialMedia.${field}`, formatUrl(value, defaultDomain));
      }
    };

  useEffect(() => {
    const fieldsToCheck = [
      "linkedin",
      "twitter",
      "researchGate",
      "googleScholar",
    ] as const;

    fieldsToCheck.forEach((field) => {
      if (!socialMediaValues?.[field]) {
        setValue(`socialMedia.${field}`, DEFAULT_URL);
      }
    });
  }, [setValue, socialMediaValues]);
  //TODO: Update placeholders and labels for researchGate and googleScholar
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-grayscale-600">
        <Globe className="mr-2 inline-block size-4 lg:size-5" />
        <span>Redes sociales</span>
      </label>
      <div className="grid gap-4">
        <div>
          <Input
            {...register("socialMedia.linkedin", {
              required: "Este campo es requerido",
              validate: (value) =>
                !value ||
                isValidUrl(value) ||
                "Ingrese una URL válida para LinkedIn",
            })}
            placeholder="LinkedIn URL (ej: linkedin.com/in/handin.pro)"
            onBlur={handleBlur("linkedin", "linkedin.com/in")}
            label="LinkedIn"
            isRequired
          />
          {errors.socialMedia?.linkedin && (
            <p className="mt-1 text-sm text-red-500">
              {errors.socialMedia.linkedin.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("socialMedia.twitter", {
              required: "Este campo es requerido",
              validate: (value) =>
                !value ||
                isValidUrl(value) ||
                "Ingrese una URL válida para Twitter",
            })}
            placeholder="Twitter URL (ej: twitter.com/handin.pro)"
            onBlur={handleBlur("twitter", "twitter.com")}
            label="Twitter"
            isRequired
          />
          {errors.socialMedia?.twitter && (
            <p className="mt-1 text-sm text-red-500">
              {errors.socialMedia.twitter.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("socialMedia.researchGate", {
              required: "Este campo es requerido",
              validate: (value) =>
                !value ||
                isValidUrl(value) ||
                "Ingrese una URL válida para Facebook",
            })}
            placeholder="Facebook URL (ej: facebook.com/handin.pro)"
            onBlur={handleBlur("researchGate", "facebook.com")}
            label="Facebook"
            isRequired
          />
          {errors.socialMedia?.researchGate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.socialMedia.researchGate.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("socialMedia.googleScholar", {
              required: "Este campo es requerido",
              validate: (value) =>
                !value ||
                isValidUrl(value) ||
                "Ingrese una URL válida para Instagram",
            })}
            placeholder="Instagram URL (ej: instagram.com/handin.pro)"
            onBlur={handleBlur("googleScholar", "instagram.com")}
            label="Instagram"
            isRequired
          />
          {errors.socialMedia?.googleScholar && (
            <p className="mt-1 text-sm text-red-500">
              {errors.socialMedia.googleScholar.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-grayscale-100 p-3">
        <p className="text-sm text-grayscale-600">
          <strong>Nota:</strong> Si no tienes alguna de estas redes sociales,
          puedes dejar el campo vacío. Se usará automáticamente la URL por
          defecto:{" "}
          <code className="rounded bg-grayscale-300 px-1">{DEFAULT_URL}</code>
        </p>
      </div>
    </div>
  );
};
