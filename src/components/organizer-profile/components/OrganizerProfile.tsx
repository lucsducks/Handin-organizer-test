import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Organizer } from "@/models/organizer/organizer.model";
import { useOrganizerProfileLogic } from "../hook/useOrganizerProfileLogic";
import { OrganizerProfileBasicInfo } from "./OrganizerProfileBasicInfo";
// import { OrganizerProfileCertifications } from "./OrganizerProfileCertifications";
import { OrganizerProfileContactInfo } from "./OrganizerProfileContactInfo";
// import { OrganizerProfileEducation } from "./OrganizerProfileEducation";
// import { OrganizerProfileExperience } from "./OrganizerProfileExperience";
import { OrganizerProfileFooter } from "./OrganizerProfileFooter";

// import { OrganizerProfileSkills } from "./OrganizerProfileSkills";

interface OrganizerProfileProps {
  organizer: Organizer;
}

export default function OrganizerProfile({ organizer }: OrganizerProfileProps) {
  const {
    formatDate,
    generateUniqueId,
    organizerName,
    // hasValidSkills,
    // validEducation,
    // validExperience,
    // validCertifications,
    validSocialMedia,
    // filteredSkills,
  } = useOrganizerProfileLogic(organizer);

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4">
        <OrganizerProfileBasicInfo
          organizer={organizer}
          organizerName={organizerName}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{organizer.biography}</p>
            </CardContent>
          </Card>

          <OrganizerProfileContactInfo
            organizerEmail={organizer.user?.email || "Email no disponible"}
            validSocialMedia={validSocialMedia}
            generateUniqueId={generateUniqueId}
          />
          {/* <OrganizerProfileSkills
            hasValidSkills={hasValidSkills}
            filteredSkills={filteredSkills}
          /> */}
        </div>

        {/* <div className="grid gap-4 md:grid-cols-2">
          <OrganizerProfileEducation
            validEducation={validEducation}
            generateUniqueId={generateUniqueId}
          />
          <OrganizerProfileExperience
            validExperience={validExperience}
            generateUniqueId={generateUniqueId}
          />
        </div> */}

        {/* <OrganizerProfileCertifications
          validCertifications={validCertifications}
          generateUniqueId={generateUniqueId}
          formatDate={formatDate}
        /> */}

        <OrganizerProfileFooter
          createdAt={organizer.updatedAt}
          updatedAt={organizer.updatedAt}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
}
