import { getStrapiURL } from "@/lib/utils";
import { getJWT } from "./get-toiken";
import qs from "qs";

export async function getMe() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

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
