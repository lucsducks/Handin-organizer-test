import React from "react";

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PaginationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="hover:border-primary inline-flex size-9 h-9 items-center justify-center rounded-full border-2 border-grayscale-300 bg-white text-grayscale-500 transition-colors duration-200 hover:border-primary-500-main hover:text-primary-500-main"
      {...props}
    >
      {children}
    </button>
  );
});

PaginationButton.displayName = "PaginationButton";
