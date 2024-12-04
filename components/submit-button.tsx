"use client";

import { SubmitButtonProps } from "@/lib/interfaces";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Loader = ({ text }: { readonly text: string }) => (
  <div className="flex items-center gap-1">
    <Loader2 className=" animate-spin" />
    <span>{text}</span>
  </div>
);

const SubmitButton = ({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      className={className}
      disabled={status.pending || loading}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
};

export default SubmitButton;
