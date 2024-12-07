import { getStrapiURL } from "@/lib/utils";
import { getJWT } from "./get-toiken";

export async function mutateData(method: string, path: string, payload: any) {
  const baseUrl = getStrapiURL();
  const jwt = await getJWT();
  const url = new URL(path, baseUrl);

  if (!jwt) throw new Error("Нельзя!");

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ...payload }),
    });

    if (method === "DELETE") {
      return response.ok;
    }

    const data = await response?.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
