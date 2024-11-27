import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./logo";

const SiteHeader = () => {
  return (
    <header className="p-3 bg-card rounded-md flex gap-5 items-center shadow-md sticky top-0 z-50">
      <Logo />
      <div className="flex-grow">search...</div>
      <ModeToggle />
    </header>
  );
};

export default SiteHeader;
