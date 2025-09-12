import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResendCodeEmail } from "@/types/user/user.type";
import { UseMutateFunction } from "@tanstack/react-query";
import { Hash, Send } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface InputCodeProps {
  id: string;
  error?: string;
  email?: string;
  resendEmailCode: UseMutateFunction<
    string | undefined,
    Error,
    ResendCodeEmail,
    unknown
  >;
}

export const InputCode = forwardRef<HTMLInputElement, InputCodeProps>(
  ({ id, error, email, resendEmailCode, ...props }, ref) => {
    const [buttonText, setButtonText] = useState("Enviar código");
    const [countdown, setCountdown] = useState(20);
    const [isSending, setIsSending] = useState(false);
    const [sendCount, setSendCount] = useState(0);

    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;

      if (isSending && countdown > 0) {
        setButtonText(`Reenviar en ${countdown}s`);
        intervalId = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else if (countdown === 0) {
        setIsSending(false);
        setButtonText("Reenviar código");
        if (sendCount >= 3) {
          setCountdown(300);
        } else {
          setCountdown(20);
        }
        clearInterval(intervalId);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, [isSending, countdown, sendCount]);

    const handleSendClick = () => {
      if (!isSending) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email && emailRegex.test(email)) {
          resendEmailCode({ email });
          setIsSending(true);
          setSendCount((prev) => prev + 1);
        } else {
          toast.error("Por favor, introduce un correo electrónico válido");
        }
      }
    };

    return (
      <div className="flex w-full flex-row gap-2">
        <Input
          id={id}
          ref={ref}
          {...props}
          className="w-full"
          icon={<Hash />}
          label="Codigo de verificación"
          type="number"
          placeholder="Código"
          error={error}
        />
        <Button
          intent="secondary"
          className="mt-[22px] min-w-32 text-nowrap md:mt-[26px]"
          onClick={() => handleSendClick()}
        >
          <Send className="size-4" />
          {buttonText}
        </Button>
      </div>
    );
  },
);

InputCode.displayName = "InputCode";
