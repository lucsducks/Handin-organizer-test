import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  textClass?: string;
}

export function Checkbox({ id, label, textClass, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group relative flex w-fit cursor-pointer items-center duration-200"
    >
      <input
        id={id}
        type="checkbox"
        className="peer appearance-none"
        {...props}
      />
      <div className="pointer-events-none flex size-5 items-center justify-center overflow-hidden rounded-[4px] border border-grayscale-500 bg-white p-1 duration-200 group-hover:border-primary-500-main peer-checked:border-primary-500-main peer-checked:bg-primary-500-main">
        <span className="text-white duration-200">
          <Check size={16} />
        </span>
      </div>
      <span
        className={twMerge(
          "ml-2 text-base font-normal text-grayscale-900 duration-200 group-hover:text-primary-500-main",
          textClass,
        )}
      >
        {label}
      </span>
    </label>
  );
}
