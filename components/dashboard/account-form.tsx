"use client";

import React, { useActionState, useEffect } from "react";
import { AccountFormProps } from "@/lib/interfaces";
import { Input } from "../ui/input";
import { Coins } from "lucide-react";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../submit-button";
import { updateAccountAction } from "@/data/account-actions";
import StrapiErrors from "../strapi-errors";
import { useToast } from "@/hooks/use-toast";

const CreditBox = ({ num }: { readonly num: number }) => {
  return (
    <div className="rounded flex items-center justify-center gap-2 bg-background">
      <Coins />
      <span
        className={`font-semibold text-2xl ${
          num === 0 ? "text-destructive" : ""
        }`}
      >
        {num}
      </span>
    </div>
  );
};

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
};

const AccountForm = ({ data }: { readonly data: AccountFormProps }) => {
  const [formState, formAction] = useActionState(
    updateAccountAction,
    INITIAL_STATE
  );

  const { toast } = useToast();

  useEffect(() => {
    if (formState.data && !formState.strapiErrors) {
      toast({
        title: "Успешно!",
        description: "Профиль пользователя обновлён",
        variant: "success",
      });
    }
  }, [formState]);

  return (
    <form className="flex flex-col gap-5 col-span-2" action={formAction}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4">
        <Input id="id" name="id" type="hidden" defaultValue={data?.id} />
        <Input
          id="username"
          name="username"
          placeholder="Имя пользователя"
          defaultValue={data?.username || ""}
          disabled
        />
        <Input
          id="email"
          name="email"
          placeholder="E-Mail"
          defaultValue={data?.email || ""}
          disabled
        />
        <CreditBox num={data?.credits} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Input
          id="firstName"
          name="firstName"
          placeholder="Имя"
          defaultValue={data?.firstName || ""}
        />
        <Input
          id="lastName"
          name="lastName"
          placeholder="Фамилия"
          defaultValue={data?.lastName || ""}
        />
      </div>
      <Textarea
        id="bio"
        name="bio"
        placeholder="обо мне..."
        defaultValue={data?.bio || ""}
        rows={10}
      />
      <SubmitButton text="Сохранить" loadingText="В процессе..." />
      <StrapiErrors error={formState?.strapiErrors} />
    </form>
  );
};

export default AccountForm;
