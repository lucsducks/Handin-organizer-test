import { cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva(
  "font-medium rounded-lg flex w-fit flex-row items-center justify-center gap-2 duration-200 outline-none",
  {
    variants: {
      intent: {
        primary:
          "bg-primary-500-main text-white hover:bg-primary-600 disabled:bg-primary-300",
        secondary:
          "border bg-transparent text-primary-500-main border-primary-500-main hover:bg-primary-100 disabled:border-primary-300 disabled:text-primary-300",
        tertiary: "text-primary-500-main hover:bg-primary-100",
        icon: "text-primary-500-main duration-200 hover:bg-primary-100",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-10 text-base md:text-base md:h-12 px-4",
        icon: "p-2 size-10",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

const LoadingSpinner = ({ size = "sm" }: { size?: "sm" | "md" }) => {
  const spinnerSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  
  return (
    <svg
      className={`animate-spin ${spinnerSize}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  intent?: "primary" | "secondary" | "tertiary" | "icon";
  size?: "sm" | "md" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, intent, size, loading = false, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;
    const spinnerSize = size === "sm" ? "sm" : "md";

    return (
      <button
        ref={ref}
        className={twMerge(buttonVariants({ intent, size }), className)}
        disabled={isDisabled}
        {...props}
      >
        {loading && <LoadingSpinner size={spinnerSize} />}
        {loading ? (
          <span className="opacity-70">{children}</span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";