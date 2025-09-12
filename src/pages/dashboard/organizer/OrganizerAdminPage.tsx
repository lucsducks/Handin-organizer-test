import OrganizerList from "./components/OrganizerList";

export default function OrganizerAdminPage() {
  return (
    <article className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
      <OrganizerList />
    </article>
  );
}
