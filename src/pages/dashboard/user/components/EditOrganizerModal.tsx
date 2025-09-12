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
import { Textarea } from "@/components/ui/textarea";
import { Organizer } from "@/models/organizer/organizer.model";
import { useOrganizerActions } from "@/store/organizer.store";
import { UpdateOrganizerForm } from "@/types/organizer/organizer.type";
import {
  Award,
  BadgeCheck,
  Book,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe,
  GraduationCap,
  ListChecks,
  Microscope,
  Pencil,
  Plus,
  Save,
  School,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditOrganizerDialogProps {
  organizer: Organizer;
}

const EditOrganizerDialog = ({ organizer }: EditOrganizerDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateOrganizerProfile } = useOrganizerActions();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateOrganizerForm>({
    defaultValues: {
      degree: organizer.degree,
      specialty: organizer.specialty,
      biography: organizer.biography,
      experience: organizer.experience || [],
      education: organizer.education || [],
      certifications: organizer.certifications || [],
      skills: organizer.skills || [],
      socialMedia: organizer.socialMedia || {},
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    if (organizer.skills) {
      setValue("skills", organizer.skills);
    }
  }, [organizer, setValue]);

  useEffect(() => {
    if (organizer) {
      setValue("skills", organizer.skills || []);
      setValue("experience", organizer.experience || []);
      setValue("education", organizer.education || []);
      setValue("certifications", organizer.certifications || []);
    }
  }, [organizer, setValue]);

  const onSubmit = async (data: UpdateOrganizerForm) => {
    try {
      setIsSubmitting(true);

      const submitData = data;

      await updateOrganizerProfile(submitData);
      setIsOpen(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al actualizar";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pencil className="size-4" />
          Editar Perfil Organizador
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil de Organizador</DialogTitle>
          <DialogDescription>
            Actualiza tu información profesional aquí.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 overflow-y-auto px-2"
        >
          <div className="space-y-4">
            <Input
              {...register("degree", { required: "Este campo es requerido" })}
              type="text"
              icon={<Book />}
              label="Grado académico"
              placeholder="Ej: Maestría en Educación"
              error={errors.degree?.message}
              isRequired
            />
            <Input
              {...register("specialty", {
                required: "Este campo es requerido",
              })}
              type="text"
              icon={<Award />}
              label="Especialidad"
              placeholder="Ej: Matemáticas Avanzadas"
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
              placeholder="Cuéntanos sobre ti..."
              label="Biografía"
              error={errors.biography?.message}
              isRequired
            />
            <Input
              label="Habilidades"
              icon={<ListChecks />}
              {...register("skills", {
                required: "Debes ingresar al menos una habilidad",
                validate: (value) =>
                  (Array.isArray(value) && value.length > 0) ||
                  "Habilidades requeridas",
                setValueAs: (value) =>
                  typeof value === "string"
                    ? value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== "")
                    : value,
              })}
              placeholder="Habilidades (separadas por comas)"
            />
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
                      <span className="ml-2 text-base font-normal text-grayscale-900 duration-200 group-hover:text-primary-500-main">
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
            <div className="space-y-4">
              <label className="block text-lg font-medium text-grayscale-600">
                <Globe className="mr-2 inline-block size-4 lg:size-5" />
                <span>Redes sociales</span>
              </label>
              <div className="grid gap-4">
                <Input
                  {...register("socialMedia.linkedin")}
                  placeholder="LinkedIn URL"
                />
                <Input
                  {...register("socialMedia.twitter")}
                  placeholder="Twitter URL"
                />
                <Input
                  {...register("socialMedia.researchGate")}
                  placeholder="Facebook URL"
                />
                <Input
                  {...register("socialMedia.googleScholar")}
                  placeholder="Instagram URL"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              intent="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
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

export default EditOrganizerDialog;
