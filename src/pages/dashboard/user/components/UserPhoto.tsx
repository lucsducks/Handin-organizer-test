"use client";

import { UserAuth } from "@/models/user/user.model";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UserPhoto({
  user,
  className,
  classNameText,
  previewUrl,
}: {
  user: UserAuth | null;
  className?: string;
  classNameText?: string;
  previewUrl?: string | null;
}) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const [imageError, setImageError] = useState(false);

  if (previewUrl) {
    return (
      <div
        className={twMerge(
          "relative size-10 overflow-hidden rounded-full",
          className,
        )}
      >
        <img
          src={previewUrl}
          alt="preview-photo"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  if (user?.user.profilePicture?.publicUrl && !imageError) {
    return (
      <div
        className={twMerge(
          "relative size-10 overflow-hidden rounded-full",
          className,
        )}
      >
        <img
          src={user.user.profilePicture.publicUrl}
          alt="user-photo"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "flex size-10 items-center justify-center rounded-full bg-primary-500-main",
        className,
      )}
    >
      <span
        className={twMerge("text-sm font-medium text-white", classNameText)}
      >
        {getInitials(user?.user.firstName ?? "N", user?.user.lastName ?? "N")}
      </span>
    </div>
  );
}
