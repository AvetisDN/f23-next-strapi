import { FeatureProps } from "@/lib/interfaces";
import React from "react";

import { CheckCircle2, Clock3, CloudUpload } from "lucide-react";

function getIcon(name: string) {
  switch (name) {
    case "CLOCK_ICON":
      return <Clock3 size={64} />;
    case "CHECK_ICON":
      return <CheckCircle2 size={64} />;
    case "CLOUD_ICON":
      return <CloudUpload size={64} />;
    default:
      return null;
  }
}

const FeaturesItem = ({ data }: { readonly data: FeatureProps }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center bg-card p-4 py-8 rounded-md shadow-lg">
      <div>{getIcon(data.icon)}</div>
      <h3 className="text-2xl opacity-70 font-bold">{data.heading}</h3>
      <p className=" opacity-50 max-w-72">{data.subHeading}</p>
    </div>
  );
};

export default FeaturesItem;
