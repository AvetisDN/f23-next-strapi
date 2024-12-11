import AccountForm from "@/components/dashboard/account-form";
import AvatarForm from "@/components/dashboard/avatar-form";
import { getMe } from "@/services/get-me";
import React from "react";

const AccountPage = async () => {
  const user = await getMe();
  const userData = user.data;
  const userAvatar = userData?.image;

  return (
    <div className="flex flex-col gap-6 bg-card p-4 rounded w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AccountForm data={userData} />
        <AvatarForm data={userAvatar} />
      </div>
    </div>
  );
};

export default AccountPage;
