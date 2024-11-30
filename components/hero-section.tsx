import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { HeroSectionProps } from "@/lib/interfaces";
import StrapiImage from "./strapi-image";

const HeroSection = ({ data }: { readonly data: HeroSectionProps }) => {
  const { heading, subHeading, image, link } = data;

  return (
    <div className="bg-card rounded-md w-full relative overflow-hidden container mx-auto h-[40vw] min-h-[400px] max-h-[60vh]">
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "bg"}
        fill={true}
      />
      <div className="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col gap-4 text-gray-100">
        <h1 className="text-4xl font-black md:text-5xl xl:text-6xl">
          {heading}
        </h1>
        <p className="text-base font-medium md:text-lg xl:text-xl text-center">
          {subHeading}
        </p>
        <Link
          href={link.url}
          target={`${link.isExternal ? "__blank" : undefined}`}
        >
          <Button size="lg" className="uppercase tracking-wide">
            {link.text}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
