"use client";
import React, { useActionState } from "react";
import ImagePicker from "../image-picker";
import { AvatarFormProps } from "@/lib/interfaces";
import SubmitButton from "../submit-button";
import { Input } from "../ui/input";
import { uploadAvatarAction } from "@/data/account-actions";
import ZodErrors from "../zod-errors";
import StrapiErrors from "../strapi-errors";

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
  zodErrors: null,
};

const AvatarForm = ({ data }: { data: Readonly<AvatarFormProps> }) => {
  const [formState, formAction] = useActionState(
    uploadAvatarAction,
    INITIAL_STATE
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <Input id="id" name="id" type="hidden" defaultValue={data?.id} />
        <ImagePicker id="image" name="image" defaultValue={data?.url || ""} />
        <ZodErrors error={formState?.zodErrors?.image} />
        <StrapiErrors error={formState?.strapiErrors} />
        <SubmitButton text="Загрузить" loadingText="Загрузка..." />
      </div>
    </form>
  );
};

export default AvatarForm;
