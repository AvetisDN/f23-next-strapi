"use client";

import React, { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";
import { registerAction } from "@/data/auth-actions";
import ZodErrors from "../zod-errors";
import StrapiErrors from "../strapi-errors";
import SubmitButton from "../submit-button";

const INITIAL_STATE = {
  data: null,
};

const FormRegister = () => {
  const [formState, formAction] = useActionState(registerAction, INITIAL_STATE);

  console.log(formState);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>создайте новый аккаунт</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Имя пользователя"
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <SubmitButton
                className="uppercase"
                text="Создать аккаунт"
                loadingText="В процессе..."
              />
              <StrapiErrors error={formState?.strapiErrors} />
            </div>
          </CardFooter>
        </Card>
        <div className="mt-5 text-center">
          <Link href="/login" className="text-primary underline">
            Уже есть аккаунт
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
