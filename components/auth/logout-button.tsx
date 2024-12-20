import { logoutAction } from "@/data/auth-actions";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <Button variant="ghost">
        <LogOut />
        <span className="hidden md:inline-block">Выход</span>
      </Button>
    </form>
  );
};

export default LogoutButton;
