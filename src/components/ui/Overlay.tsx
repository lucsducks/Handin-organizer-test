import { twMerge } from "tailwind-merge";

const Overlay = ({
  onclick,
  className,
}: Readonly<{
  className?: string;
  onclick?: () => void;
}>) => {
  return (
    <div
      onClick={onclick}
      className={twMerge(
        "fixed left-0 top-0 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50",
        className
      )}
    ></div>
  );
};

export default Overlay;
