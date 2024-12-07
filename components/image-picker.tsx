"use client";
import { ImagePickerProps } from "@/lib/interfaces";
import React, { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function generateDataUrl(file: File, callback: (imageUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result as string);
  reader.readAsDataURL(file);
}

const ImagePicker = ({
  id,
  name,
  label,
  defaultValue,
}: Readonly<ImagePickerProps>) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      generateDataUrl(file, setDataUrl);
    }
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        id={id}
        name={name}
        accept="image/*"
        onChange={handleChange}
        ref={fileInput}
      />
    </div>
  );
};

export default ImagePicker;
