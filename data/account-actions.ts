"use server";
import { fileDeleteService, fileUploadService } from "@/services/file-services";
import { getMe } from "@/services/get-me";
import { mutateData } from "@/services/mutate-data";
import { revalidatePath } from "next/cache";
import qs from "qs";
import { z } from "zod";

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

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const imageSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file.size !== 0 && file.name !== undefined,
      "Пожалуйста обновите или добавьте новое изображение"
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file?.type),
      "Изображение должно иметь формат JPG, PNG, WEBP или GIF"
    )
    .refine(
      (file) => MAX_FILE_SIZE > file?.size,
      `Изображение не должно весить более ${(
        MAX_FILE_SIZE /
        (1024 * 1024)
      ).toFixed(1)}Мб`
    ),
});

export async function uploadAvatarAction(prevState: any, formData: FormData) {
  const user = await getMe();
  if (!user.ok) throw new Error("Вы не авторизованы");

  const userId = user.data.id;
  const obj = Object.fromEntries(formData);

  const imageId = obj.id as string;

  const validatedFields = imageSchema.safeParse({
    image: obj.image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Что-то пошло не так!",
    };
  }

  if (imageId) {
    try {
      await fileDeleteService(imageId);
    } catch (error) {
      return {
        ...prevState,
        zodErrors: null,
        strapiErrors: null,
        message: "Что-то пошло не так!",
      };
    }
  }

  const uploadResponse = await fileUploadService(obj.image);

  if (!uploadResponse) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      message: "Что-то пошло не так!",
    };
  }

  if (uploadResponse.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: uploadResponse.error,
      message: "Что-то пошло не так!",
    };
  }

  const updatedImageId = uploadResponse[0].id;
  const payload = { image: updatedImageId };

  const update = await mutateData("PUT", `/api/users/${userId}`, payload);

  revalidatePath("/dashboard/account");

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    data: update,
    message: "Обновлено",
  };
}
