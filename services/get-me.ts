import { getStrapiURL } from "@/lib/utils";
import { getJWT } from "./get-toiken";

export async function getMe() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);

  const jwt = await getJWT();
  if (!jwt) {
    return {
      ok: false,
      data: null,
      error: null,
    };
  }

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      return {
        ok: false,
        data: null,
        error: data.error,
      };
    }
    return {
      ok: true,
      data,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      data: null,
      error,
    };
  }
}
