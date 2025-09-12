import Spinner from "@/components/ui/Spinner";

export const ConferenceOrganizerLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-12 text-center">
      <Spinner />
      <p className="mt-4 text-sm text-grayscale-600">
        Cargando conferencias...
      </p>
    </div>
  );
};
