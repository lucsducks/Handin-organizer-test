import { cn } from "@/lib/utils";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
  icon?: React.ReactNode;
  id?: string;
  label?: string;
  error?: string;
  className?: string;
  isRequired?: boolean;
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & React.ComponentProps<"textarea">
>(({ className, id, label, isRequired, error, ...props }, ref) => {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="flex flex-col gap-[2px]">
        <div className="flex flex-row gap-1">
          {label && (
            <span className="text-sm font-normal text-grayscale-500 md:text-base">
              {label}
            </span>
          )}
          {isRequired && (
            <span className="text-sm text-error md:text-base">*</span>
          )}
        </div>
        <textarea
          className={cn(
            "flex min-h-10 w-full rounded-lg border border-grayscale-400 px-4 py-2 md:min-h-12",
            "ring-primary-500-main ring-offset-2 hover:border-primary-500-main",
            "focus-within:border-primary-500-main focus-within:ring-1",
            "text-base transition-all",
            "resize-y md:min-h-[80px] xl:min-h-[100px]",
            "file:border-2 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            "text-grayscale-800 placeholder:text-grayscale-500",
            "outline-none disabled:cursor-not-allowed",
            "hover:border-primary-500-main",
            `${error && "border-red-500"}`,
            className,
          )}
          ref={ref}
          id={id}
          {...props}
        />
      </label>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
