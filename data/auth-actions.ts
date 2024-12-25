"use server";
import { loginService, registerService } from "@/services/auth-services";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const coookieConfig = {
  maxAge: 14 * 24 * 3600,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const messageUsername = "Имя пользователя должно содержать от 3 до 20 символов";
const messageIdentifier =
  "Имя пользователя должно содержать не менее 3 символов";
const messagePassword = "Пароль должен содержать от 6 до 100 символов";

const schemaRegister = z.object({
  username: z
    .string()
    .min(3, {
      message: messageUsername,
    })
    .max(20, {
      message: messageUsername,
    }),
  password: z
    .string()
    .min(6, {
      message: messagePassword,
    })
    .max(100, {
      message: messagePassword,
    }),
  email: z.string().email({
    message: "Введите корректный E-Mail",
  }),
});

export async function registerAction(prevState: any, formData: FormData) {
  const authData = schemaRegister.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!authData.success) {
    return {
      ...prevState,
      zodErrors: authData.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Что-то пошло не так",
    };
  }

  const response = await registerService(authData.data);

  if (!response) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      message: "Что-то пошло не так",
    };
  }
  if (response.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: response.error,
      message: "Что-то пошло не так",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, coookieConfig);

  redirect("/dashboard");
}

const schemaLogin = z.object({
  identifier: z.string().min(3, {
    message: messageIdentifier,
  }),
  password: z
    .string()
    .min(6, {
      message: messagePassword,
    })
    .max(100, {
      message: messagePassword,
    }),
});

export async function loginAction(prevState: any, formData: FormData) {
  const authData = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!authData.success) {
    return {
      ...prevState,
      zodErrors: authData.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Что-то пошло не так",
    };
  }

  const response = await loginService(authData.data);

  if (!response) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      message: "Что-то пошло не так",
    };
  }
  if (response.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: response.error,
      message: "Что-то пошло не так",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, coookieConfig);

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...coookieConfig, maxAge: 0 });
  redirect("/");
}
