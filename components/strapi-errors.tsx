import { StrapiErrorsProps } from "@/lib/interfaces";
import React from "react";

const StrapiErrors = ({ error }: { readonly error: StrapiErrorsProps }) => {
  if (!error?.message) return null;
  return (
    <div className="text-destructive font-medium text-sm pt-2 text-center">
      {error.message}
    </div>
  );
};

export default StrapiErrors;
