interface DataItemProps {
  label: string;
  data: string | number;
}

export function DataItem({ label, data }: DataItemProps) {
  return (
    <div>
      <p className="text-sm text-grayscale-600 lg:text-base">{label}</p>
      <p className="text-base font-medium text-grayscale-800 lg:text-lg">
        {data}
      </p>
    </div>
  );
}
