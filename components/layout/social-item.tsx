import { SocialLink } from "@/lib/interfaces";
import Link from "next/link";
import React from "react";
import VKIcon from "../icons/vk-icon";
import TelegramIcon from "../icons/telegram-icon";
import GithubIcon from "../icons/github-icon";
import TooltipItem from "./tooltip-item";

function getIcon(name: string) {
  switch (name) {
    case "VK_ICON":
      return <VKIcon size={32} />;
    case "TG_ICON":
      return <TelegramIcon size={32} />;
    case "GITHUB_ICON":
      return <GithubIcon size={32} />;
    default:
      return null;
  }
}
const SocialItem = ({ data }: { readonly data: SocialLink }) => {
  return (
    <TooltipItem label={data.label}>
      <Link href={data.url} target="_blank">
        {getIcon(data.icon)}
      </Link>
    </TooltipItem>
  );
};

export default SocialItem;
