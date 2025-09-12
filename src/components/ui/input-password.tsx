"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { forwardRef, useState } from "react";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ id, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="flex w-full flex-col gap-1">
        <label htmlFor={id} className="flex flex-col gap-[2px]">
          <span className="text-sm font-normal text-grayscale-500 md:text-base">
            {label || "Contraseña"}
          </span>
          <div
            className={`group flex h-10 flex-row items-center justify-center gap-2 rounded-lg border border-grayscale-400 px-4 ring-primary-500-main ring-offset-2 duration-200 focus-within:border-primary-500-main focus-within:ring-1 hover:border-primary-500-main md:h-12 ${
              error && "border-red-500"
            }`}
          >
            <Lock className="size-5 text-grayscale-500 duration-200 group-hover:text-primary-500-main" />
            <input
              id={id}
              name={id}
              ref={ref}
              type={showPassword ? "text" : "password"}
              placeholder="Ingresar contraseña"
              className="peer w-full bg-transparent text-base font-normal text-grayscale-800 outline-none placeholder:text-grayscale-500"
              {...props}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="text-grayscale-500 [&>*]:size-5"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";
