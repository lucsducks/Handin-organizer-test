import React from "react";
import ChangePasswordDialog from "../ChangePasswordDialog";
import { DataItem } from "../DataItem";
import EditProfileDialog from "../EditProfileDialogs";
import UpdateProfileForm from "../UpdateProfileForm";

interface UserProfileBasicInfoProps {
  user: any;
}

export const UserProfileBasicInfo: React.FC<UserProfileBasicInfoProps> = ({
  user,
}) => {
  return (
    <section className="flex w-full flex-col justify-center gap-4 overflow-hidden rounded-2xl border border-primary-100 shadow transition-all">
      <UpdateProfileForm />
      <div className="mt-4 flex flex-col gap-2 self-center text-center">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row">
          <h1 className="text-xl font-semibold text-grayscale-800 md:text-3xl">
            {user.user.firstName} {user.user.lastName}
          </h1>
          <span
            className={`rounded-full px-2 py-1 text-sm ${
              user.user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.user.isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
        <p className="text-base text-grayscale-600 md:text-lg">
          {user.user.email}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-6 pb-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="col-span-2 text-lg font-medium text-primary-500-main md:text-xl">
            Datos Personales
          </h2>
          {user.user.firstName && (
            <DataItem label="Nombre" data={user.user.firstName} />
          )}
          {user.user.lastName && (
            <DataItem label="Apellido" data={user.user.lastName} />
          )}
          {user.user.phone && (
            <DataItem label="Teléfono" data={user.user.phone} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-primary-500-main md:text-xl">
            Detalles de la cuenta
          </h2>
          <DataItem
            label="Última Actualización"
            data={new Date(user.user.updatedAt).toLocaleDateString()}
          />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-end gap-4 lg:flex-row">
          <ChangePasswordDialog />
          <EditProfileDialog user={user.user} />
        </div>
      </div>
    </section>
  );
};
