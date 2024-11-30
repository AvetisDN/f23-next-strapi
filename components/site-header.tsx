import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./logo";
import { HeaderProps } from "@/lib/interfaces";
import Link from "next/link";
import { Button } from "./ui/button";

const SiteHeader = ({ data }: Readonly<HeaderProps>) => {
  const { logo, ctaButton } = data;
  return (
    <header className="p-3 bg-card md:rounded-md flex gap-5 items-center shadow-md sticky top-0 z-50 container mx-auto">
      <Logo label={logo.label} />
      <div className="flex-grow">search...</div>
      <Link href={ctaButton.url}>
        <Button>{ctaButton.text}</Button>
      </Link>
      <ModeToggle />
    </header>
  );
};

export default SiteHeader;
