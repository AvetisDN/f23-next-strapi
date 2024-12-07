import React from "react";
import ImagePicker from "../image-picker";
import { AvatarFormProps } from "@/lib/interfaces";

const AvatarForm = ({ data }: { readonly data: AvatarFormProps }) => {
  return (
    <div>
      <ImagePicker
        id="image"
        name="image"
        label="Аватар"
        defaultValue={data?.url || ""}
      />
    </div>
  );
};

export default AvatarForm;
