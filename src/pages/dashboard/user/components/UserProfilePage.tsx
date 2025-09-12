import Spinner from "@/components/ui/Spinner";
import { Role } from "@/enums/role.enum";
import React from "react";
import { useUserProfileLogic } from "../hooks/useUserProfileLogic";
import { UserProfileBasicInfo } from "./user-profile/UserProfileBasicInfo";
import { UserProfileOrganizerForm } from "./user-profile/UserProfileOrganizerForm";
import { UserProfileOrganizerProfile } from "./user-profile/UserProfileOrganizerProfile";


export const UserProfile: React.FC = () => {
  const {
    user,
    organizer,
    isLoading,
    fileError,
    submitError,
    selectedFile,
    formMethods,
    handleDownloadCV,
    formatDate,
    handleFileChange,
    handleFileRemove,
    isValidUrl,
    formatUrl,
    onSubmit,
  } = useUserProfileLogic();

  if (!user) {
    return (
      <p className="text-center text-secondary">No hay usuario autenticado.</p>
    );
  }

  const shouldShowOrganizerSection =
    user.user.roles.includes(Role.USER) &&
    !user.user.roles.includes(Role.ADMIN) &&
    !user.user.roles.includes(Role.MODERATOR);

  return (
    <article className="flex flex-1 flex-col items-center gap-4 p-4 lg:p-8">
      <UserProfileBasicInfo user={user} />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {shouldShowOrganizerSection && (
            <>
              {organizer == null ? (
                <UserProfileOrganizerForm
                  submitError={submitError}
                  formMethods={formMethods}
                  isLoading={isLoading}
                  selectedFile={selectedFile}
                  fileError={fileError}
                  handleFileChange={handleFileChange}
                  handleFileRemove={handleFileRemove}
                  isValidUrl={isValidUrl}
                  formatUrl={formatUrl}
                  onSubmit={onSubmit}
                />
              ) : (
                <UserProfileOrganizerProfile
                  organizer={organizer}
                  formatDate={formatDate}
                  handleDownloadCV={handleDownloadCV}
                />
              )}
            </>
          )}
        </>
      )}
    </article>
  );
};
