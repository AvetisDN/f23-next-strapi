import Link from "next/link";
import LogoIcon from "./icons/logo-icon";
import { LogoProps } from "@/lib/interfaces";

const Logo = ({ label = "LOGO" }: Readonly<LogoProps>) => {
  return (
    <Link href="/" className="flex gap-1 text-primary">
      <LogoIcon size={32} />
      <span className="font-bold text-xl">{label}</span>
    </Link>
  );
};

export default Logo;
