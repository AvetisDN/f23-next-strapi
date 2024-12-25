"use client";
import { ImagePickerProps } from "@/lib/interfaces";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import ImageCard from "./image-card";
import { Label } from "./ui/label";

function generateDataUrl(file: File, callback: (imageUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result as string);
  reader.readAsDataURL(file);
}

const ImagePicker = ({
  id,
  name,
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
      <Label
        className="p-6 text-center bg-background rounded-xl block cursor-pointer"
        htmlFor={id}
      >
        {dataUrl ? (
          <div className=" relative aspect-square">
            <ImageCard dataUrl={dataUrl} />
          </div>
        ) : (
          <div className=" font-bold">Изображение не выбрано</div>
        )}
      </Label>
      <Input
        className="hidden"
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
