import { Bug } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1 text-primary">
      <Bug className="h-8 w-8" />
      <span className="font-bold text-xl">SummaryAI</span>
    </Link>
  );
};

export default Logo;
