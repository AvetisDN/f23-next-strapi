"use client";
import React from "react";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const Loader = () => (
  <div className="flex items-center gap-1">
    <Loader2 className=" animate-spin" />
  </div>
);

const DeleteButton = () => {
  const status = useFormStatus();
  return (
    <Button
      size="sm"
      variant="destructive"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? <Loader /> : <Trash2 />}
    </Button>
  );
};

export default DeleteButton;
