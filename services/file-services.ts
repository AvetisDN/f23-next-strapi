import { getStrapiURL } from "@/lib/utils";
import { mutateData } from "./mutate-data";
import { getJWT } from "./get-toiken";

export async function fileDeleteService(imageId: string) {
  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
  return data;
}

export async function fileUploadService(image: any) {
  const jwt = await getJWT();

  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  formData.append("files", image, image.name);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
