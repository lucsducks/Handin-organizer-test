import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { NewOrganizerForm } from "@/types/organizer/organizer.type";
import { Send } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UserProfileOrganizerFormBasicFields } from "./UserProfileOrganizerFormBasicFields";
// import { UserProfileOrganizerFormCertifications } from "./UserProfileOrganizerFormCertifications";
// import { UserProfileOrganizerFormEducation } from "./UserProfileOrganizerFormEducation";
// import { UserProfileOrganizerFormExperience } from "./UserProfileOrganizerFormExperience";
import { UserProfileOrganizerFormFileUpload } from "./UserProfileOrganizerFormFileUpload";
import { UserProfileOrganizerFormHeader } from "./UserProfileOrganizerFormHeader";
import { UserProfileOrganizerFormSocialMedia } from "./UserProfileOrganizerFormSocialMedia";

interface UserProfileOrganizerFormProps {
  submitError: string | null;
  formMethods: UseFormReturn<NewOrganizerForm>;
  isLoading: boolean;
  selectedFile: File | null;
  fileError: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
  isValidUrl: (url: string) => boolean;
  formatUrl: (url: string, defaultDomain: string) => string;
  onSubmit: (data: NewOrganizerForm) => Promise<void>;
}

export const UserProfileOrganizerForm: React.FC<
  UserProfileOrganizerFormProps
> = ({
  submitError,
  formMethods,
  isLoading,
  selectedFile,
  fileError,
  handleFileChange,
  handleFileRemove,
  isValidUrl,
  formatUrl,
  onSubmit,
}) => {
  //TODO: Change inputs according to organizer profile needs
  return (
    <section className="w-full rounded-lg border border-primary-100 p-6 shadow transition-all">
      <UserProfileOrganizerFormHeader submitError={submitError} />

      <form className="space-y-6" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <UserProfileOrganizerFormBasicFields formMethods={formMethods} />

          {/* <UserProfileOrganizerFormExperience formMethods={formMethods} />

          <UserProfileOrganizerFormEducation formMethods={formMethods} />

          <UserProfileOrganizerFormCertifications formMethods={formMethods} /> */}

          <UserProfileOrganizerFormSocialMedia
            formMethods={formMethods}
            isValidUrl={isValidUrl}
            formatUrl={formatUrl}
          />

          <UserProfileOrganizerFormFileUpload
            selectedFile={selectedFile}
            fileError={fileError}
            handleFileChange={handleFileChange}
            handleFileRemove={handleFileRemove}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full justify-self-end sm:w-fit"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span>Enviando</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Enviar</span>
            </>
          )}
        </Button>
      </form>
    </section>
  );
};
