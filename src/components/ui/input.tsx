import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  id?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, id, label, error, isRequired, className, ...props }, ref) => {
    return (
      <div className={twMerge("flex flex-col gap-1", className)}>
        <label htmlFor={id} className="flex flex-col gap-[2px]">
          {label && (
            <div className="flex flex-row gap-1">
              <span className="text-sm font-normal text-grayscale-500 md:text-base">
                {label}
              </span>
              {isRequired && (
                <span className="text-sm text-error md:text-base">*</span>
              )}
            </div>
          )}
          <div
            className={`group flex h-10 flex-row items-center justify-center gap-2 rounded-lg border border-grayscale-400 px-4 ring-primary-500-main ring-offset-2 duration-200 focus-within:border-primary-500-main focus-within:ring-1 hover:border-primary-500-main md:h-12 ${
              error && "border-red-500"
            }`}
          >
            {icon && (
              <span className="text-grayscale-500 duration-200 group-hover:text-primary-500-main [&>*]:size-5">
                {icon}
              </span>
            )}
            <input
              id={id}
              name={id}
              ref={ref}
              type="text"
              className="peer w-full bg-transparent text-base font-normal text-grayscale-800 outline-none [appearance:textfield] placeholder:text-grayscale-500 [&::-webkit-inner-spin-button]:appearance-none"
              {...props}
            />
          </div>
        </label>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
