import { Card } from "@/components/ui/card";
import { Recording } from "@/models/recording/recording.model";
import React from "react";
import { RecordingAdminDetailBasicInfo } from "./RecordingAdminDetailBasicInfo";
import { RecordingAdminDetailMetrics } from "./RecordingAdminDetailMetrics";
import { RecordingAdminDetailRequirementsLearnings } from "./RecordingAdminDetailRequirementsLearnings";
import { RecordingAdminDetailResources } from "./RecordingAdminDetailResource";

interface RecordingAdminDetailMainContentProps {
  recording: Recording;
  students: number;
  formatDate: (date: string) => string;
}

export const RecordingAdminDetailMainContent: React.FC<
  RecordingAdminDetailMainContentProps
> = ({ recording, students }) => {
  return (
    <Card className="col-span-1 flex flex-col gap-4 overflow-hidden xl:col-span-2">
      <section className="col-span-2 flex flex-col gap-4">
        <RecordingAdminDetailBasicInfo recording={recording} />
        <RecordingAdminDetailMetrics
          recording={recording}
          students={students}
        />
        <RecordingAdminDetailRequirementsLearnings recording={recording} />
        <RecordingAdminDetailResources recording={recording} />
      </section>
    </Card>
  );
};
