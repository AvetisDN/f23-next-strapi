import { FooterProps } from "@/lib/interfaces";
import React from "react";
import Logo from "./logo";
import SocialItem from "./social-item";

const SiteFooter = ({ data }: Readonly<FooterProps>) => {
  const { logo, social, copyright } = data;

  return (
    <footer className="bg-zinc-950 p-4  text-zinc-300">
      <div className=" flex gap-5 flex-col sm:flex-row justify-between items-center py-10 ">
        <Logo label={logo.label} />
        <div className="flex gap-2">
          <span>&copy; </span>
          <span>{new Date().getFullYear()}</span>
          <span>{copyright}</span>
        </div>
        <div className="flex items-center gap-4">
          {social.map((item, index) => (
            <SocialItem data={item} key={index} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
