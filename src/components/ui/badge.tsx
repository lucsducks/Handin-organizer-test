import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center text-white rounded-md px-2 py-0.5 text-xs font-medium text-center",
  {
    variants: {
      variant: {
        default: "bg-primary-500-main",
        success: "bg-green-500",
        warning: "bg-orange-500",
        neutral: "bg-grayscale-800",
        error: "bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
