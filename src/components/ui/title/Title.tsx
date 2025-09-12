import { twMerge } from "tailwind-merge";

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={twMerge(
        "text-primary text-center text-3xl font-semibold tracking-wide lg:text-center xl:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
