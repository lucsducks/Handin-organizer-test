import { twMerge } from "tailwind-merge";

interface ParagraphProps {
  children?: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p
      className={twMerge(
        "text-secondary text-lg tracking-wide sm:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
