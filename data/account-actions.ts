"use server";
import { mutateData } from "@/services/mutate-data";
import { revalidatePath } from "next/cache";
import qs from "qs";

export async function updateAccountAction(prevState: any, formData: FormData) {
  const query = qs.stringify({
    populate: "*",
  });

  const obj = Object.fromEntries(formData);
  const userId = obj.id;
  const payload = {
    firstName: obj.firstName,
    lastName: obj.lastName,
    bio: obj.bio,
  };

  const data = await mutateData(
    "PUT",
    `/api/users/${userId}?${query}`,
    payload
  );

  if (!data) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ой! Что-то пошло не так!",
    };
  }
  if (data.error) {
    return {
      ...prevState,
      strapiErrors: data.error,
      message: "Ой! Что-то конкретное пошло не так!",
    };
  }

  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    message: "Изменения сохранены",
    data,
    strapiErrors: null,
  };
}
