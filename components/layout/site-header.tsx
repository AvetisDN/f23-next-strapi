import React from "react";
import { ModeToggle } from "@/components/layout/mode-toggle";
import Logo from "./logo";
import { HeaderProps } from "@/lib/interfaces";
import Link from "next/link";
import { Button } from "../ui/button";
import { getMe } from "@/services/get-me";
import { UserInfoProps } from "./../../lib/interfaces";
import LogoutButton from "../auth/logout-button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import SummaryForm from "../summary/summary-form";

const UserInfo = ({ userData }: { readonly userData: UserInfoProps }) => (
  <div className="flex gap-2 items-center">
    <Link href="/dashboard">
      <Avatar>
        <AvatarFallback className="font-black">
          {userData.username.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </Link>
    <LogoutButton />
  </div>
);

const SiteHeader = async ({ data }: Readonly<HeaderProps>) => {
  const { logo, ctaButton } = data;

  const user = await getMe();

  return (
    <header className="p-4 bg-card flex gap-5 items-center shadow-md sticky top-0 z-50 flex-wrap">
      <Logo label={logo.label} />
      <div className="flex-grow order-1 w-full sm:order-none sm:w-auto">
        {user.ok && <SummaryForm />}
      </div>
      <div className="flex-grow sm:hidden"></div>
      {user.ok && <UserInfo userData={user.data} />}
      {!user.ok && (
        <Link href={ctaButton.url}>
          <Button>{ctaButton.text}</Button>
        </Link>
      )}
      <ModeToggle />
    </header>
  );
};

export default SiteHeader;
