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
import { loginAction } from "@/data/auth-actions";
import ZodErrors from "../zod-errors";
import StrapiErrors from "../strapi-errors";
import SubmitButton from "../submit-button";

const INITIAL_STATE = {
  data: null,
};

const FormLogin = () => {
  const [formState, formAction] = useActionState(loginAction, INITIAL_STATE);

  console.log(formState);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Авторизация</CardTitle>
            <CardDescription>войти на сайт под своим аккаунтом</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Имя пользователя или E-Mail"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
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
                text="Войти"
                loadingText="В процессе..."
              />
              <StrapiErrors error={formState?.strapiErrors} />
            </div>
          </CardFooter>
        </Card>
        <div className="mt-5 text-center">
          <Link href="/register" className="text-primary underline">
            Создать новый аккаунт
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
